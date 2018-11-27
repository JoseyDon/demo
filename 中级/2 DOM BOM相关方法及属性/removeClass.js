function removeClass(obj,className){
	//如果原来有class
	if (obj.className != '') {
		var arrClassName = obj.className.split(' ');
		var _index = arrIndexOf(arrClassName,className);
		//如果有我们要移除的class
		if (_index != -1) {
			arrClassName.splice(_index,1);
			obj.className = arrClassName.join(' ');
		}
	}
}


function arrIndexOf(arr,v){
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == v) {
			return i;
		}
	}
	return -1;
}