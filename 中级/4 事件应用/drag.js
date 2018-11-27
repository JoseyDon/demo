function drag(obj){
		obj.onmousedown = function(ev){
		var ev = ev||event;

		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;

		if (obj.setCapture) {
			obj.setCapture();
		}

		document.onmousemove = function(ev){
			var ev = ev||event;

			var L = ev.clientX - disX;
			var T = ev.clientY - disY;

			if (L < 100 ) {
				L = 0;
			}else if (L>document.documentElement.clientWidth - obj.offsetWidth) {
				L = document.documentElement.clientWidth - obj.offsetWidth;
			}

			if (T < 0 ) {
				T = 0;
			}else if (T>document.documentElement.clientHeight - obj.offsetHeight) {
				T = document.documentElement.clientHeight - obj.offsetHeight;
			}

			obj.style.left = L+'px';
			obj.style.top = T+'px';
		}

		document.onmouseup = function(){
			document.onmousemove = document.onmouseup = null;
			if (obj.releaseCapture) {
				obj.releaseCapture();
			}
		}

		return false;
	}
}