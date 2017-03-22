	var wrap = document.getElementById("wrap");
	var inner = document.getElementById("inner");
	var paganation = document.getElementById("paganation");
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	var spanList = paganation.getElementsByTagName("span");
	var index = 0;
	var distance = wrap.offsetWidth;
	var clickflag = true;
	var time;

function AutoGo(){
	var start = inner.offsetLeft;
	var end = index*distance*(-1);
	var change = end-start;
	var timer;
	var t=0;
	var maxT=30;
	clear();
	if (index==spanList.length) {
		spanList[0].className = "selected";
	}else{
		spanList[index].className = "selected";
	}
	clearInterval(timer);
	timer = setInterval(function(){
		t++;
		if (t>=maxT) {
			clearInterval(timer);
			clickflag = true;
		}
		inner.style.left = change/maxT*t + start + "px";
		//当移动到最后一张图片时，回到第一张的位置
		if (index == spanList.length && t>= maxT) {
			inner.style.left = 0;
			index = 0;
		}
	},17)
}

//清除页面所有按钮状况颜色
function clear(){
	for (var i = 0; i < spanList.length; i++) {
		spanList[i].className = "";
	}
}
//图片向后移动
function forward(){
	index++;
	if (index>spanList.length) {
		index = 0;
	}
	AutoGo();
}
//图片向前移动
function backward(){
	index--;
	if (index<0) {
		index=spanList.length-1;
		inner.style.left=(index+1)*distance*(-1)+"px";
	}
	AutoGo();
}
time = setInterval(forward,3000);
//遍历每个按钮让其切换到对应图片
for (var i = 0; i < spanList.length; i++) {
	spanList[i].onclick = function(){
		index = this.innerText-1;
		AutoGo();
	}
}
//左切换事件
left.onclick=function(){
	if (clickflag) {
		backward();
	}
	clickflag = false;
}
//右切换事件
right.onclick=function(){
	if (clickflag) {
		forward();
	}
	clickflag=false;
}
//鼠标悬停动画停止
wrap.onmouseover = function(){
	clearInterval(time);
}
//鼠标移开动画开始
wrao.onmouseout = function(){
	time = setInterval(forward,3000);
}