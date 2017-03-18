var inputName = document.getElementsByTagName('input')[0];
var infoWord = document.getElementById("info");
document.getElementsByTagName("button")[0].onclick = validate;

function validate(){
	var inputValue =inputName.value;
	if (countLength(inputValue) == 0) {
		infoWord.innerHTML = '姓名不能为空';
		infoWord.style.color = 'red';
		inputName.style.border = '2px solid red';
	}else if (countLength(inputValue) >=4 && countLength(inputValue) <=16) {
		infoWord.innerHTML = '名称格式正确';
		infoWord.style.color = 'green';
		inputName.style.border = '2px solid green';
	}else{
			infoWord.innerHTML = '请输入长度为4~16位字符';
			infoWord.style.color = 'red';
			inputName.style.border = '2px solid red';
	}
}
function countLength(str){
	var inputLength = 0;
	for (var i = 0; i < str.length; i++) {
		var countCode = str.charCodeAt(i);
		if (countCode >= 0 && countCode <= 128) {
			inputLength += 1;
		}else{
			inputLength +=2;
		}
	}
	return inputLength;
}