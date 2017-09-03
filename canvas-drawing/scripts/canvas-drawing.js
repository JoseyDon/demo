var canvas;//canvas
var context;//绘制环境
var canvasWidth = 863;//画布宽度
var canvasHeight = 600;//画布高度
var padding = 25;//填充
var lineWidth = 8;//边框宽度
var colorPurple = "#cb3594";//紫色
var colorGreen = "#659b41";//绿色
var colorYellow = "#ffcf33";//黄色
var colorBrown = "#986928";//棕色
var outlineImage = new Image();
var crayonImage = new Image();//蜡笔图片
var markerImage = new Image();//马克笔图片
var eraserImage = new Image();//橡皮擦图片
var crayonBackgroundImage = new Image();//蜡笔背景图片
var markerBackgroundImage = new Image();//马克笔背景图片
var eraserBackgroundImage = new Image();//橡皮擦背景图片
var crayonTextureImage = new Image();
var clickX = new Array();//点击处x轴坐标
var clickY = new Array();//点击处y轴坐标
var clickColor = new Array();//点击颜色
var clickTool = new Array();//点击工具
var clickSize = new Array();//点击尺寸
var clickDrag = new Array();
var paint = false;
var curColor = colorPurple;//默认颜色
var curTool = "crayon";//默认工具
var curSize = "normal";//默认尺寸
var mediumStartX = 18;
var mediumStartY = 19;
var mediumImageWidth = 93;//画笔宽度
var mediumImageHeight = 46;//画笔高度
var drawingAreaX = 111;//作画区域横起点
var drawingAreaY = 11;//作画区域竖起点
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

function resourceLoaded()//资源加载完毕
{
	if(++curLoadResNum >= totalLoadResources){//如果
		redraw();//重绘
	}
}

/**
* Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
创建一个canvas元素，加载图片，添加事件，为第一次画canvas准备
*/
function prepareCanvas()
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasDiv');//获取canvasDiv
	canvas = document.createElement('canvas');//创建canvas元素
	canvas.setAttribute('width', canvasWidth);//设置canvas宽度属性
	canvas.setAttribute('height', canvasHeight);//设置canvas高度属性
	canvas.setAttribute('id', 'canvas');//设置canvasId属性
	canvasDiv.appendChild(canvas);//把canvas元素添加到canvasDiv元素中
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); // 绘制2d绘图环境
	// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	// 加载图片
	// -----------
	crayonImage.onload = function() { resourceLoaded(); //加载蜡笔图片数组
	};
	crayonImage.src = "images/crayon-outline.png";
	//context.drawImage(crayonImage, 0, 0, 100, 100);
	
	markerImage.onload = function() { resourceLoaded(); //加载马克笔图片数组
	};
	markerImage.src = "images/marker-outline.png";
	
	eraserImage.onload = function() { resourceLoaded(); //加载橡皮擦图片数组
	};
	eraserImage.src = "images/eraser-outline.png";	
	
	crayonBackgroundImage.onload = function() { resourceLoaded(); //选中蜡笔背景数组
	};
	crayonBackgroundImage.src = "images/crayon-background.png";
	
	markerBackgroundImage.onload = function() { resourceLoaded(); //选中马克笔背景数组
	};
	markerBackgroundImage.src = "images/marker-background.png";
	
	eraserBackgroundImage.onload = function() { resourceLoaded(); //选中橡皮擦背景数组
	};
	eraserBackgroundImage.src = "images/eraser-background.png";

	crayonTextureImage.onload = function() { resourceLoaded();//蜡笔纹理图片加载 
	};
	crayonTextureImage.src = "images/crayon-texture.png";
	
	outlineImage.onload = function() { resourceLoaded(); //预设图片
	};
	outlineImage.src = "images/watermelon-duck-outline.png";

	// 添加鼠标事件
	// ----------------
	$('#canvas').mousedown(function(e)//在canvas区域鼠标按下
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;//鼠标x坐标等于当前光标的横坐标减去这个元素对于父级元素的左边距
		var mouseY = e.pageY - this.offsetTop;//鼠标x坐标等于当前光标的横坐标减去这个元素对于父级元素的左边距
		
		//选择画笔颜色
		if(mouseX < drawingAreaX) //如果鼠标横坐标小于作画开始区域x（111）
		{
			if(mouseX > mediumStartX)//鼠标横坐标大于作画区域y
			{
				if(mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight){//在紫色区域内
					curColor = colorPurple;
				}else if(mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2){//在绿色区域内
					curColor = colorGreen;
				}else if(mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3){//在黄色区域内
					curColor = colorYellow;
				}else if(mouseY > mediumStartY + mediumImageHeight * 3 && mouseY < mediumStartY + mediumImageHeight * 4){//在棕色区域内
					curColor = colorBrown;
				}
			}
		}
		//否则选择是tool栏
		else if(mouseX > drawingAreaX + drawingAreaWidth) // Right of the drawing area
		{
			if(mouseY > toolHotspotStartY)
			{
				if(mouseY > sizeHotspotStartY)
				{
					var sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
					if(mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX > sizeHotspotStartX)
					{
						if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge){
							curSize = "huge";
						}else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
							curSize = "large";
						}else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
							curSize = "normal";
						}else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
							curSize = "small";						
						}
					}
				}
				else
				{
					if(mouseY < toolHotspotStartY + toolHotspotHeight){
						curTool = "crayon";
					}else if(mouseY < toolHotspotStartY + toolHotspotHeight * 2){
						curTool = "marker";
					}else if(mouseY < toolHotspotStartY + toolHotspotHeight * 3){
						curTool = "eraser";
					}
				}
			}
		}
		else if(mouseY > drawingAreaY && mouseY < drawingAreaY + drawingAreaHeight)
		{
			// Mouse click location on drawing area
		}
		paint = true;
		addClick(mouseX, mouseY, false);
		redraw();
	});
	
	$('#canvas').mousemove(function(e){
		if(paint==true){
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
}

/**
* Adds a point to the drawing array.
* @param x
* @param y
* @param dragging
*/
//画画
function addClick(x, y, dragging)
{
	clickX.push(x);
	clickY.push(y);
	clickTool.push(curTool);
	clickColor.push(curColor);
	clickSize.push(curSize);
	clickDrag.push(dragging);
}

/**
* Clears the canvas.//clearRect// 删除一个画布的矩形区域
*/
function clearCanvas()
{
	context.clearRect(0, 0, canvasWidth, canvasHeight);
}

/**
* Redraws the canvas.重绘画板
*/
function redraw()
{
	// Make sure required resources are loaded before redrawing
	///确定所需的资源,重新划定之前加载
	if(curLoadResNum < totalLoadResources){ return; }//如果没有加载完 退出
	
	clearCanvas();//加载完毕 首先清空画板
	
	var locX;//加载x坐标
	var locY;//加载y坐标
	if(curTool == "crayon")//如果当前工具为蜡笔
	{
		// Draw the crayon tool background 绘制蜡笔工具背景
		context.drawImage(crayonBackgroundImage, 0, 0, canvasWidth, canvasHeight);
		//在绘制环境中绘制选中蜡笔后的背景图片
		
		//紫色 绘制工具颜色填充
		locX = (curColor == colorPurple) ? 18 : 52;
		locY = 19;
		
		context.beginPath();
		context.moveTo(locX + 141, locY + 11);
		context.lineTo(locX + 41, locY + 35);
		context.lineTo(locX + 29, locY + 35);
		context.lineTo(locX + 29, locY + 33);
		context.lineTo(locX + 11, locY + 27);
		context.lineTo(locX + 11, locY + 19);
		context.lineTo(locX + 29, locY + 13);
		context.lineTo(locX + 29, locY + 11);
		context.lineTo(locX + 41, locY + 11);
		context.closePath();//结束画图
		context.fillStyle = colorPurple;//填充颜色
		context.fill();	//填充

		if(curColor == colorPurple){
			context.drawImage(crayonImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
		
		// 绿色 绘制工具颜色填充
		locX = (curColor == colorGreen) ? 18 : 52;
		locY += 46;
		
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
		
		// 黄色 绘制工具颜色填充
		locX = (curColor == colorYellow) ? 18 : 52;
		locY += 46;
		
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
		
		// 棕色 绘制工具颜色填充
		locX = (curColor == colorBrown) ? 18 : 52;
		locY += 46;
		
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
	//如果为马克笔情况
	else if(curTool == "marker")
	{
		// Draw the marker tool background
		context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);
		
		// Purple
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
		
		// Green
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
		
		// Yellow
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
		
		// Yellow
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
	//如果为橡皮擦
	else if(curTool == "eraser")
	{
		context.drawImage(eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
		context.drawImage(eraserImage, 18, 19, mediumImageWidth, mediumImageHeight);	
	}else{
		alert("Error: Current Tool is undefined");
	}
	//选择尺寸没懂locx和locy有什么用
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
	
	// Keep the drawing in the drawing area
	context.save();
	context.beginPath();
	context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);//矩形区域
	context.clip();//裁剪
		
	//定义尺寸
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
			alert("Error: Radius is zero for click " + i);
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
			//context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
			context.strokeStyle = 'white';
		}else{
			//context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
			context.strokeStyle = clickColor[i];
		}
		context.lineJoin = "round";
		context.lineWidth = radius;
		context.stroke();
		
	}




	//context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
	context.restore();//恢复路径
	
	// Overlay a crayon texture (if the current tool is crayon)
	//选择蜡笔时覆盖蜡笔纹路
	if(curTool == "crayon"){
		context.globalAlpha = 0.4; // No IE support
		context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
	}
	context.globalAlpha = 1; // No IE support
	
	// Draw the outline image
	context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}