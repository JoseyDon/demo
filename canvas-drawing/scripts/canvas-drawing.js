var canvas;
var context;
var canvasWidth = 863;//canvas宽度
var canvasHeight = 600;//canvas高度
var padding = 25;
var lineWidth = 8;
var colorPurple = "#cb3594";//紫色
var colorGreen = "#659b41";//绿色
var colorYellow = "#ffcf33";//黄色
var colorBrown = "#986928";//棕色
var outlineImage = new Image();
var crayonImage = new Image();//蜡笔图片
var markerImage = new Image();//马克笔图片
var eraserImage = new Image();//橡皮擦图片
var crayonBackgroundImage = new Image();//选中蜡笔后背景图片
var markerBackgroundImage = new Image();//选中马克笔后背景图片
var eraserBackgroundImage = new Image();//选中橡皮擦后背景图片
var crayonTextureImage = new Image();//蜡笔条纹图片
var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var paint = false;
var curColor = colorPurple;//默认颜色
var curTool = "crayon";//默认工具
var curSize = "normal";//默认尺寸
var mediumStartX = 18;
var mediumStartY = 19;
var mediumImageWidth = 93;//画笔宽度
var mediumImageHeight = 46;//画笔高度
var drawingAreaX = 111;//作画区域横起点坐标
var drawingAreaY = 11;//作画区域竖起点坐标
var drawingAreaWidth = 574;//作画区域宽度
var drawingAreaHeight = 600;//作画区域高度
var toolHotspotStartY = 90;//工具开始纵坐标
var toolHotspotHeight = 74;//工具操作高度
var sizeHotspotStartY = 440;//尺寸开始纵坐标
var sizeHotspotHeight = 100;//尺寸操作高度
var sizeHotspotWidthObject = new Object();//尺寸操作宽度对象
sizeHotspotWidthObject.huge = 65;//最大尺寸宽度
sizeHotspotWidthObject.large = 42;//大尺寸宽度
sizeHotspotWidthObject.normal = 26;//正常尺寸宽度
sizeHotspotWidthObject.small = 22;//小尺寸宽度
var totalLoadResources = 8;//全部加载资源数
var curLoadResNum = 0;//当前加载资源数

//加载资源图片
function resourceLoaded(){
	if (++curLoadResNum <= totalLoadResources) {
		redraw();//绘制资源图片
	}
}

function prepareCanvas(){
//添加画布
var canvasDiv = document.getElementById('canvasDiv');
var canvas = document.createElement('canvas');
canvas.setAttribute('width',canvasWidth);
canvas.setAttribute('height',canvasHeight);
canvas.setAttribute('id','canvas');
canvasDiv.appendChild(canvas);

//excanvas框架中针对IE加载canvas延时问题手动初始化对象
if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}

//绘制2d绘制环境
context = canvas.getContext('2d');

//加载图片
crayonImage.onload = function(){ resourceLoaded(); }
crayonImage.src = "images/crayon-outline.png";

markerImage.onload = function() { resourceLoaded(); };
markerImage.src = "images/marker-outline.png";
	
eraserImage.onload = function() { resourceLoaded(); };
eraserImage.src = "images/eraser-outline.png";	
	
crayonBackgroundImage.onload = function() { resourceLoaded(); };
crayonBackgroundImage.src = "images/crayon-background.png";
	
markerBackgroundImage.onload = function() { resourceLoaded(); };
markerBackgroundImage.src = "images/marker-background.png";
	
eraserBackgroundImage.onload = function() { resourceLoaded(); };
eraserBackgroundImage.src = "images/eraser-background.png";

crayonTextureImage.onload = function() { resourceLoaded(); };
crayonTextureImage.src = "images/crayon-texture.png";
	
outlineImage.onload = function() { resourceLoaded(); };
outlineImage.src = "images/watermelon-duck-outline.png";

//鼠标放下事件
$("#canvas").mousedown(function(e){

//获取鼠标坐标
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;

	//选择颜色栏
	if (mouseX < drawingAreaX) {
		if (mouseX >mediumStartX ) {
			if (mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight) {
				curColor = colorPurple;
			}else if (mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight*2) {
				curColor = colorGreen;
			}else if (mouseY > mediumStartY + mediumImageHeight*2 && mouseY < mediumStartY + mediumImageHeight*3) {
				curColor = colorYellow;
			}else if (mouseY > mediumStartY + mediumImageHeight*3 && mouseY < mediumStartY + mediumImageHeight*4) {
				curColor = colorBrown;
			}
		}
	}
	//作图区域右边
	else if (mouseX > drawingAreaX + drawingAreaWidth) {
		//工具区域下方
		if (mouseY > toolHotspotStartY) {
			//尺寸选择区域下方
			if (mouseY > sizeHotspotStartY) {
				var sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
				//尺寸选择区域
				if (mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX >sizeHotspotStartX) {
					if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge) {
						curSize = "huge";
					}else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge +sizeHotspotWidthObject.large) {
						curSize = "large";
					}else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge +sizeHotspotWidthObject.large + sizeHotspotWidthObject.normal) {
						curSize = "normal";
					}else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge +sizeHotspotWidthObject.large + sizeHotspotWidthObject.normal + sizeHotspotWidthObjec.small) {
						curSize = "small";
					}
				}
			}
			//工具选择区域
			else
			{
				if (mouseY < toolHotspotStartY + toolHotspotHeight) {
					curTool = "crayon";
				}else if (mouseY < toolHotspotStartY + toolHotspotHeight*2) {
					curTool = "marker";
				}else if (mouseY < toolHotspotStartY + toolHotspotHeight*4) {
					curTool = "eraser";
				}
			}
		}
	}
	else if (mouseY > drawingAreaY && mouseY < drawingAreaY + drawingAreaHeight) {
		//鼠标选择空白区域
	}
	paint = true;
	addClick(mouseX,mouseY,false);
	redraw();
});

//鼠标移动事件
$("#canvas").mousemove(function(e){
	if (paint) {
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	}
});

$('#canvas').mouseup(function(e){
		paint = false;
	  	redraw();
	});
	
$('#canvas').mouseleave(function(e){
		paint = false;
	});
};

function addClick(x,y,dragging){
	clickX.push(x);
	clickY.push(y);
	clickTool.push(curTool);
	clickColor.push(curColor);
	clickSize.push(curSize);
	clickDrag.push(dragging);
};

//清空cavans
function clearCanvas(){
	context.clearRect(0,0,canvasWidth,canvasHeight);
}

function redraw(){
	//判断图片素材是否加载完
	if (curLoadResNum < totalLoadResources) {
		return;
	}

	//清空canvas
	clearCanvas();

	var locX;
	var locY;

	//选择蜡笔的情况
	if (curTool == "crayon") {
		//以选中马克笔后背景图片为背景
		context.drawImage(crayonBackgroundImage,0,0,canvasWidth,canvasHeight);

		//紫色
		locX = (curColor == colorPurple)?18:52;
		locY = 19;
		context.beginPath();
		context.moveTo(locX + 41, locY + 11);
		context.lineTo(locX + 41, locY + 35);
		context.lineTo(locX + 29, locY + 35);
		context.lineTo(locX + 29, locY + 33);
		context.lineTo(locX + 11, locY + 27);
		context.lineTo(locX + 11, locY + 19);
		context.lineTo(locX + 29, locY + 13);
		context.lineTo(locX + 29, locY + 11);
		context.lineTo(locX + 41, locY + 11);
		context.closePath();
		context.fillStyle = colorPurple;
		context.fill();
		if(curColor == colorPurple){
			context.drawImage(crayonImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}

		//绿色
		locX = (curColor == colorGreen)?18:52;
		locY +=46;
		context.beginPath();
		context.moveTo(locX + 41, locY + 11);
		context.lineTo(locX + 41, locY + 35);
		context.lineTo(locX + 29, locY + 35);
		context.lineTo(locX + 29, locY + 33);
		context.lineTo(locX + 11, locY + 27);
		context.lineTo(locX + 11, locY + 19);
		context.lineTo(locX + 29, locY + 13);
		context.lineTo(locX + 29, locY + 11);
		context.lineTo(locX + 41, locY + 11);
		context.closePath();
		context.fillStyle = colorGreen;
		context.fill();
		if(curColor == colorGreen){
			context.drawImage(crayonImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}

		//黄色
		locX = (curColor == colorYellow)?18:52;
		locY +=46;
		context.beginPath();
		context.moveTo(locX + 41, locY + 11);
		context.lineTo(locX + 41, locY + 35);
		context.lineTo(locX + 29, locY + 35);
		context.lineTo(locX + 29, locY + 33);
		context.lineTo(locX + 11, locY + 27);
		context.lineTo(locX + 11, locY + 19);
		context.lineTo(locX + 29, locY + 13);
		context.lineTo(locX + 29, locY + 11);
		context.lineTo(locX + 41, locY + 11);
		context.closePath();
		context.fillStyle = colorYellow;
		context.fill();
		if(curColor == colorYellow){
			context.drawImage(crayonImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}

		//棕色
		locX = (curColor == colorBrown)?18:52;
		locY +=46;
		context.beginPath();
		context.moveTo(locX + 41, locY + 11);
		context.lineTo(locX + 41, locY + 35);
		context.lineTo(locX + 29, locY + 35);
		context.lineTo(locX + 29, locY + 33);
		context.lineTo(locX + 11, locY + 27);
		context.lineTo(locX + 11, locY + 19);
		context.lineTo(locX + 29, locY + 13);
		context.lineTo(locX + 29, locY + 11);
		context.lineTo(locX + 41, locY + 11);
		context.closePath();
		context.fillStyle = colorBrown;
		context.fill();
		if(curColor == colorBrown){
			context.drawImage(crayonImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
	}
	//选择马克笔情况
	else if (curTool == "marker") {
		//以选中马克笔后背景图片为背景
		context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);
		
		//紫色
		locX = (curColor == colorPurple) ? 18 : 52;
		locY = 19;
		context.beginPath();
		context.moveTo(locX + 10, locY + 24);
		context.lineTo(locX + 10, locY + 24);
		context.lineTo(locX + 22, locY + 16);
		context.lineTo(locX + 22, locY + 31);
		context.closePath();
		context.fillStyle = colorPurple;
		context.fill();	
		if(curColor == colorPurple){
			context.drawImage(markerImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
		
		//绿色
		locX = (curColor == colorGreen) ? 18 : 52;
		locY += 46;
		context.beginPath();
		context.moveTo(locX + 10, locY + 24);
		context.lineTo(locX + 10, locY + 24);
		context.lineTo(locX + 22, locY + 16);
		context.lineTo(locX + 22, locY + 31);
		context.closePath();
		context.fillStyle = colorGreen;
		context.fill();	
		if(curColor == colorGreen){
			context.drawImage(markerImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
		
		//黄色
		locX = (curColor == colorYellow) ? 18 : 52;
		locY += 46;
		context.beginPath();
		context.moveTo(locX + 10, locY + 24);
		context.lineTo(locX + 10, locY + 24);
		context.lineTo(locX + 22, locY + 16);
		context.lineTo(locX + 22, locY + 31);
		context.closePath();
		context.fillStyle = colorYellow;
		context.fill();	
		if(curColor == colorYellow){
			context.drawImage(markerImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
		
		//棕色
		locX = (curColor == colorBrown) ? 18 : 52;
		locY += 46;
		context.beginPath();
		context.moveTo(locX + 10, locY + 24);
		context.lineTo(locX + 10, locY + 24);
		context.lineTo(locX + 22, locY + 16);
		context.lineTo(locX + 22, locY + 31);
		context.closePath();
		context.fillStyle = colorBrown;
		context.fill();	
		if(curColor == colorBrown){
			context.drawImage(markerImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
	}
	//选择橡皮擦情况
	else if (curTool == "eraser") {
		context.drawImage(eraserBackgroundImage,0,0,canvasWidth,canvasHeight);
		context.drawImage(eraserImage,18,19,mediumImageWidth,mediumImageHeight);
	}
	//其他情况
	else{
		alert("选择工具未定义！");
	}

	if(curSize == "small"){
		locX = 467;
	}else if(curSize == "normal"){
		locX = 450;
	}else if(curSize == "large"){
		locX = 428;
	}else if(curSize == "huge"){
		locX = 399;
	}
	locY = 189;
	context.beginPath();
	context.rect(locX, locY, 2, 12);
	context.closePath();
	context.fillStyle = '#333333';
	context.fill();	
	
	//保持作画在作画区域
	context.save();
	context.beginPath();
	context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);//矩形区域
	context.clip();//裁剪

	//画笔圆形
	var radius;
	var i = 0;
	for(; i < clickX.length; i++)
	{		
		if(clickSize[i] == "small"){
			radius = 2;
		}else if(clickSize[i] == "normal"){
			radius = 5;
		}else if(clickSize[i] == "large"){
			radius = 10;
		}else if(clickSize[i] == "huge"){
			radius = 20;
		}else{
			alert("点击处的半径为0" + i);
			radius = 0;	
		}
		
		context.beginPath();
		if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
			context.moveTo(clickX[i], clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		
		if(clickTool[i] == "eraser"){
			context.strokeStyle = 'white';
		}else{
			context.strokeStyle = clickColor[i];
		}
		context.lineJoin = "round";
		context.lineWidth = radius;
		context.stroke();
	}
	context.restore();//恢复路径
	
	//选择蜡笔时覆盖蜡笔纹路
	if(curTool == "crayon"){
		context.globalAlpha = 0.4;//IE不支持
		context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
	}
	context.globalAlpha = 1; ////IE不支持
	
	//绘制原图
	context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}