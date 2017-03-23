//获取元素ID
function $(id){
	return document.getElementById(id);
}
//设置半透明遮罩和注册框不可见
$("mask").onclick=$("closeBtn").onclick=function(){
	$("mask").style.display = "none";
	$("loginBox").style.display = "none";
}
//设置注册时可见
$("loginLink").onclick=function(){
	$("mask").style.display = "block";
	$("loginBox").style.display = "block";
}
//box自动居中
function AutoCenter(element){
	var bodyW = document.documentElement.clientWidth;
	var bodyH = document.documentElement.clientHeight;
	var elementW = element.offsetWidth;
	var elementH = element.offsetHeight;
	element.style.left = (bodyW - elementW) / 2 + "px";
	element.style.top = (bodyH - elementH) / 2 + "px";
}

//自动全屏
function fillTobody(element){
	element.style.width = document.documentElement.clientWidth + "px";
	element.style.height = document.documentElement.clientHeight + "px";
}

//按着鼠标移动box
var mouseoffsetX = 0;
var mouseoffsetY = 0;
var dragFlag = false;
$("loginBoxHeader").addEventListener('mousedown',function(element){
	var element = element || window.event;
	mouseOffsetX = element.pageX - $("loginBox").offsetLeft;
	mouseOffsetY = element.pageY - $("loginBox").offsetTop;
	dragFlag = true;
})
document.onmousemove = function(element){
	var element = element ||window.event;
	mouseX = element.pageX;
	mouseY = element.pageY;
	var moveX = 0;
	var moveY = 0;
	if (dragFlag == true) {
		moveX = mouseX -mouseOffsetX;
		moveY = mouseY -mouseOffsetY;

	var pageHeight = document.documentElement.clientHeight;
	var pageWidth = document.documentElement.clientWidth;
	var boxH = $("loginBox").offsetHeight;
	var boxW = $("loginBox").offsetWidth;
	var maxMoveY = pageHeight - boxH;
	var maxMoveX = pageWidth - boxW;
	moveX = Math.min(maxMoveX,Math.max(0,moveX));
	moveY = Math.min(maxMoveY,Math.max(0,moveY));
	$("loginBox").style.left = moveX + "px";
	$("loginBox").style.top = moveY + "px";
	}
}
//松开鼠标停止移动box
document.onmouseup = function(){
	dragFlag = false;
}
window.onload = function(){
	AutoCenter($("loginBox"));
	fillTobody($("mask"));
}