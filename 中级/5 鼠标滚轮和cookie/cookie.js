function setCookie(key,value,t){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+t);
	document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}

function getCookie(key){
	var arr1 = document.cookie.split('; ');
	for (var i = 0; i < arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if (arr2[0]==key) {
			return decodeURI(arr2[1]);
		}
	}
}

function removeCookie(key){
	setCookie(key,'',-1);
}