function opacity(obj,step,target,frequency,endFn){
	var currentOpacity = getStyle(obj,'opacity')*100;
	step = currentOpacity < step ? step : -step;
	clearInterval(obj.alpha);
	obj.alpha = setInterval(function(){
		currentOpacity = getStyle(obj,'opacity')*100;
		var nextOpacity = currentOpacity + step;
		if (step > 0 && nextOpacity > target || step < 0 && nextOpacity <target) {
			nextOpacity = target;
		}
		obj.style.opacity = nextOpacity / 100;
		obj.style.filter = 'alpha(opacity:' + nextOpacity+')';
		if (nextOpacity == target) {
			clearInterval(obj.alpha);
			endFn && endFn();
		}
	},frequency);
}