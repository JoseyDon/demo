$(function(){

  function setCookie(name,value,exDate){
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+exDate);
    document.cookie = name + "=" + value + ";expires=" + exDate;
  }

  function getCookie(name){
    var arr1 = document.cookie.split("; ");
    for (var i = 0; i < arr1.length; i++) {
      var arr2 = arr1[i].split("=");
      if (arr2[0] == name) {
        return arr2[1];//value
      }
    }
    return "";
  }

//顶部条点击不再提醒过后消失且以后不再显示

//初次点击不再提醒时隐藏并且建立一个名叫nomore的cookie，值为true，保质期为30天
  $('.nomore').click(function(){
    setCookie('nomore',true,30);
    $('#noticeWrap').css('display','none');
  })

//访问时调用cookie
  $isnomore = getCookie('nomore');
  if ($isnomore) {
    $('#noticeWrap').css('display','none');
  }



//点击关注按钮判断登录的cookie是否已设置，已登录未关注变为关注，未登录弹出登录框
$('.follow').click(function(){
  $isLogin = getCookie('LoginSuc');
  if ($isLogin) {
    setCookie('LoginSuc',true,99999);
    $(".follow").css('display','none');
    $('.following').css('display','block');
  }else{
    $('.loginWrap,.loginForm').css('display','block');
  }
  })

//取消关注
$('.following').click(function(){
  setCookie('LoginSuc',null,-1);
  $('.following').css('display','none');
  $('.follow').css('display','block');
})

//关闭登录窗口
$('.loginX').click(function(){
  $('.loginWrap,.loginForm').css('display','none');
})

//更新登录窗口中用户名和密码的背景图片
function　user_pass(obj){
  if (obj.val() =="") {
    obj.css('background','url(resource/'+obj.attr('class')+'.png)no-repeat');
  }else{
    obj.css('background','url(resource/loginFocus.png)no-repeat');
  }
}

//用户名和密码框获得焦点时改变背景图片
$('.loginUser,.loginPass').focus(function(){
  $(this).css('background','url(resource/loginFocus.png)no-repeat');
})

//用户名和密码框失去焦点时,交由函数user_pass判断是否为空改变背景
$('.loginUser,.loginPass').blur(function(){
  user_pass($(this));
})

//在登陆按钮上松开鼠标改变背景
$('.loginBtn').mouseup(function(){
    $('.loginBtn').css('background','url(resource/loginBtn.png) no-repeat')
  })

//根据用户和密码框是否为空来改变背景
user_pass($('.loginUser'));
user_pass($('.loginPass'));

//当按下登陆鼠标时调用服务器Ajax登录，成功后设置登录cookie
$('.loginBtn').mousedown(function(){
  $('.loginBtn').css('background','url(resource/loginBtnDown.png) no-repeat')
  $user = md5($('.loginUser').val());
  $pass = md5($('.loginPass').val());
  $.ajax({
    type: 'get',
    url:'http://study.163.com/webDev/login.htm?userName='+$user+'&password='+$pass,
          success : function(data) {
            if (data==1) { //如果用户名和帐号正确。即data为1，则关注
              $.ajax({
                type: 'get',
                url:'http://study.163.com/webDev/attention.htm',
                success : function(data) {
                  setCookie('loginSuc',true,30);
                  setCookie('followSuc',true,9999);
                  $('.loginWrap').css('display','none');//登陆成功登陆窗口消失
                  $('.loginForm').css('display','none');
                  $('.follow').css('display','none');//follow样式改变
            $('.following').css('display','block');
                }
              })
            }
            else {
              alert('用户名或密码错误！请重新输入');
            }
          }
  });
});

//判断登陆和关注cookie 
$isFollow = getCookie('followSuc');
if ($isFollow) {
  $('.follow').css('display','none');
  $('.following').css('display','block');
}





function reAjax(objIndex,num){ //num是每页的个数
    //请求数据添加这个页码的元素
    $('.contentLeftBottomLanguage,.contentLeftBottomDesign').html('');//清空
    $.ajax({
        type: 'get',
          url:'http://study.163.com/webDev/couresByCategory.htm',
          data: "pageNo="+(objIndex+1)+"&psize="+num+"&type=10",
          success : function(data){
            $data=JSON.parse(data);
            for (var j=0;j<$data.list.length;j++) {
              $classLi = "<li><div class=\"classCover\"><div class=\"classCoverTop\"><img src="+$data.list[j].bigPhotoUrl+" class=\"classCoverPic\"><p class=\"classCoverTitle\"><nobr>"+$data.list[j].name+"</nobr><p><span class=\"classCoverNum\"><img src=\"resource/classAttentionNum.png\">"+$data.list[j].learnerCount+"在学</span><span class=\"classCoverAuthor\">发布者："+$data.list[j].provider+"</span><span class=\"classCoverClass\">分类："+$data.list[j].categoryName+"</span></div><p class=\"classCoverIntro\">"+$data.list[j].description+"</p></div><img class=\"classPic\" src="+$data.list[j].bigPhotoUrl+"><p class=\"classTitle\"><nobr>"+$data.list[j].name+"</nobr></p><span class=\"classAuthor\">"+$data.list[j].provider+"</span><span class=\"classAttentionNum\"><img src=\"resource/classAttentionNum.png\">"+$data.list[j].learnerCount+"</span><span class=\"classPrice\">￥"+$data.list[j].price+"</span></li>";
              $('.contentLeftBottomDesign').append($classLi);
            }
            //指到课程显示cover
            $('.contentLeftBottomDesign li,.contentLeftBottomLanguage li').mouseover(function(){
              $(this).children('.classCover').css('display','block');
            })
            //移出消失
            $('.contentLeftBottomDesign li,.contentLeftBottomLanguage li').mouseout(function(){
              $(this).children('.classCover').css('display','none');
            })
          }
      });
      $.ajax({
        type: 'get',
          url:'http://study.163.com/webDev/couresByCategory.htm',
          data: "pageNo="+(objIndex+1)+"&psize="+num+"&type=20",
          success : function(data){
            $data=JSON.parse(data);
            for (var j=0;j<$data.list.length;j++) {
              $classLi = "<li><div class=\"classCover\"><div class=\"classCoverTop\"><img src="+$data.list[j].bigPhotoUrl+" class=\"classCoverPic\"><p class=\"classCoverTitle\"><nobr>"+$data.list[j].name+"</nobr><p><span class=\"classCoverNum\"><img src=\"resource/classAttentionNum.png\">"+$data.list[j].learnerCount+"在学</span><span class=\"classCoverAuthor\">发布者："+$data.list[j].provider+"</span><span class=\"classCoverClass\">分类："+$data.list[j].categoryName+"</span></div><p class=\"classCoverIntro\">"+$data.list[j].description+"</p></div><img class=\"classPic\" src="+$data.list[j].bigPhotoUrl+"><p class=\"classTitle\"><nobr>"+$data.list[j].name+"</nobr></p><span class=\"classAuthor\">"+$data.list[j].provider+"</span><span class=\"classAttentionNum\"><img src=\"resource/classAttentionNum.png\">"+$data.list[j].learnerCount+"</span><span class=\"classPrice\">￥"+$data.list[j].price+"</span></li>";
              $('.contentLeftBottomLanguage').append($classLi);
            }
            //指到课程显示cover
            $('.contentLeftBottomDesign li,.contentLeftBottomLanguage li').mouseover(function(){
              $(this).children('.classCover').css('display','block');
            })
            //移出消失
            $('.contentLeftBottomDesign li,.contentLeftBottomLanguage li').mouseout(function(){
              $(this).children('.classCover').css('display','none');
            })
          }
      });//课程数据ajax
  }
  function scroll(){
    $(".scroll").animate({"margin-top":"-70px"},//向上移动70px
      function(){
          $(".scroll li:eq(0)").appendTo($(".scroll"));//把第一个接到后面去
          $(".scroll").css({"margin-top":0});
    })//最热排行无缝滚动
  }
  //打开页面获取课程数据、无缝滚动自动开始
  setInterval(scroll,5000);
  if($(window).width()<1206) {
    $('.switch').css('width','200px');
    $pageLi = "<li>4</li>";
    $('.page').append($pageLi);
    $('.contentLeft').css('width','752px');
    reAjax(0,15);
  }
  else {
    reAjax(0,20);
  }
    //主体部分
    //tab点击切换
    $('.design').click(function(){
      if ($('.contentLeftBottomDesign').css('display')=='none') {
        $('.design').css('background','url(resource/design_1.png) no-repeat');
        $('.language').css('background','url(resource/language_2.png) no-repeat');
        $('.contentLeftBottomDesign').css('display','block');
        $('.contentLeftBottomLanguage').css('display','none');
        //页码回到第一页
        $('.page li').siblings('.activePage').removeClass("activePage");
        $('.page li').eq(0).addClass("activePage");
        if($(window).width()<1206) {
        $('.switch').css('width','200px');  
        $('.contentLeft').css('width','752px');
        reAjax(0,15);
      }
      else {
        reAjax(0,20);//重新请求并添加这一页的数据
      }
      }
      else {
        return;
      }
    })
    $('.language').click(function(){
      if ($('.contentLeftBottomLanguage').css('display')=='none') {
        $('.design').css('background','url(resource/design_2.png) no-repeat');
        $('.language').css('background','url(resource/language_1.png) no-repeat');
        $('.contentLeftBottomDesign').css('display','none');
        $('.contentLeftBottomLanguage').css('display','block');
        //页码回到第一页
        $('.page li').siblings('.activePage').removeClass("activePage");
        $('.page li').eq(0).addClass("activePage");
        if($(window).width()<1206) {
        $('.switch').css('width','200px');
        $('.contentLeft').css('width','752px');
        reAjax(0,15);
      }
      else {
        reAjax(0,20);//重新请求并添加这一页的数据
      }
      }
      else {
        return;
      }
    })
    //打开视频窗口和遮罩。
    $('.videoOpen').click(function(){
      $('.loginWrap').css('display','block');
      $('.videoWindow').css('display','block');
    })
    //关闭视频窗口和遮罩。
    $('.videoWindow img').click(function(){
      $('.loginWrap').css('display','none');
      $('.videoWindow').css('display','none');
    })
    //最热排行获取数据
    $.ajax({
      type: 'get',
        url:'http://study.163.com/webDev/hotcouresByCategory.htm',
        success : function(data){
          $data=JSON.parse(data);
          for (var i = 0; i < $data.length; i++) {
            var $hotLi = $("<li class=\"scrollLi\"><img src="+$data[i].smallPhotoUrl+" class=\"hotPic\"><div class=\"scrollRight\"><p class=\"hotTitle\"><nobr>"+$data[i].name+"</nobr></p><span class=\"hotNum\"><img src=\"resource/classAttentionNum.png\">"+$data[i].learnerCount+"</span></div></li>");
            $('.scroll').append($hotLi);
          }
        }
    })
  //课程部分
    //页码点击
    $('.page li').click(function(){
      if ($(this).hasClass('activePage')) {
        return;
      }
      else {
        $('.page li').siblings('.activePage').removeClass("activePage");
      $(this).addClass('activePage');
        $AjaxIndex=$(this).index();
        if($(window).width()<1206) {
        $('.switch').css('width','200px');
        
        $('.contentLeft').css('width','752px');
        reAjax($AjaxIndex,15);
      }
      else {
        reAjax($AjaxIndex,20);//重新请求并添加这一页的数据
      }
      }
    })
    //pre按钮点击
    $('.pre').click(function(){
      if ($('.activePage').index()==0) {
        return;
      }
      else {
        $pageIndex = $('.page li').siblings('.activePage').index();
        $('.page li').siblings('.activePage').removeClass("activePage");
        $('.page li').eq($pageIndex-1).addClass('activePage');
        $AjaxIndex = $pageIndex-1;
        if($(window).width()<1206) {  
        $('.switch').css('width','200px');
        $('.contentLeft').css('width','752px');
        reAjax($AjaxIndex,15);
      }
      else {
        reAjax($AjaxIndex,20);//重新请求并添加这一页的数据
      }
      }
    })
    //next按钮
    $('.next').click(function(){
      if ($('.activePage').index()==($('.page li').length-1)) {
        return;
      }
      else {
        $pageIndex = $('.page li').siblings('.activePage').index();
        $('.page li').siblings('.activePage').removeClass("activePage");
        $('.page li').eq($pageIndex+1).addClass('activePage');
        $AjaxIndex = $pageIndex+1;
        if($(window).width()<1206) {
        $('.switch').css('width','200px');
        $('.contentLeft').css('width','752px');
        reAjax($AjaxIndex,15);
      }
      else {
        reAjax($AjaxIndex,20);//重新请求并添加这一页的数据
      }
      }
    })
})