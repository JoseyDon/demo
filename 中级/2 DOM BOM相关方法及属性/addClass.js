function addClass(obj,className){
	//如果原来没有class
	if (obj.className == '') {
		obj.className = className;
	}else{
		//如果原来有class
		var arrClassName = obj.className.split(' ');
		var _index = arrIndexOf(arrClassName,className);
		//如果要添加的class在原来的class中不存在
		if (_index == -1) {
			obj.className += ' '+ className;
		}
	}
};


function arrIndexOf(arr,v){
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == v) {
			return i;
		}
	}
	return -1;
}