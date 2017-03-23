var inputName = document.getElementById("name");
var inputPw1 = document.getElementById("pw1");
var inputPw2 = document.getElementById("pw2");
var inputEmail = document.getElementById("email");
var inputPhone = document.getElementById("phone");
var infoName = document.getElementById("name-info");
var infoPw1 = document.getElementById("pw1-info");
var infoPw2 = document.getElementById("pw2-info");
var infoEmail = document.getElementById("email-info");
var infoPhone = document.getElementById("phone-info");
inputName.onfocus = focus_name;
inputPw1.onfocus = focus_pw1;
inputPw2.onfocus = focus_pw2;
inputEmail.onfocus = focus_email;
inputPhone.onfocus = focus_phone;
inputName.onblur = validate_name;
inputPw1.onblur = validate_pw1;
inputPw2.onblur = validate_pw2;
inputEmail.onblur = validate_email;
inputPhone.onblur = validate_phone;
var f1,f2,f3,f4,f5;
document.getElementsByTagName('button')[0].onclick=function(){
if(f1&&f2&&f3&&f4&&f5){
	alert("输入成功！");
}else{
	alert("输入有误！");
	}
}
//name
function focus_name(){
	infoName.style.opacity = "1";
}
function validate_name(){
	var inputNameValue =inputName.value;
	if (countLength(inputNameValue) == 0) {
		infoName.innerHTML = '姓名不能为空';
		infoName.style.color = 'red';
		inputName.style.border = '2px solid red';
	}else if (countLength(inputNameValue) >=4 && countLength(inputNameValue) <=16) {
		infoName.innerHTML = '名称格式正确';
		infoName.style.color = 'green';
		inputName.style.border = '2px solid green';
		 f1=true;
	}else{
			infoName.innerHTML = '请输入长度为4~16位字符';
			infoName.style.color = 'red';
			inputName.style.border = '2px solid red';
	}
}

//pw1
function focus_pw1(){
	infoPw1.style.opacity = "1";
}

function validate_pw1(){
	if (countLength(inputPw1.value) == 0) {
		infoPw1.innerHTML ='密码不能为空';
		infoPw1.style.color ='red';
		inputPw1.style.border = '2px solid red';
	}else if (countLength(inputPw1.value) >=4 && countLength(inputPw1.value) <= 16) {
		infoPw1.innerHTML = '密码可用';
		infoPw1.style.color = 'green';
		inputPw1.style.border = '2px solid green';
		f2=true;
	}else{
			infoPw1.innerHTML = '请输入长度为4~16位密码';
			infoPw1.style.color = 'red';
			inputPw1.style.border = '2px solid red';
	}
}

//pw2
function focus_pw2(){
	infoPw2.style.opacity = "1";
}

function validate_pw2(){
	if (countLength(inputPw2.value) == 0) {
		infoPw2.innerHTML = '请确认密码';
		infoPw2.style.color = 'red';
		inputPw2.style.border = '2px solid red';
	}else if (inputPw2.value == inputPw1.value) {
		infoPw2.innerHTML = '密码一致';
		infoPw2.style.color = 'green';
		inputPw2.style.border = '2px solid green';
		f3=true;
	}else{
		infoPw2.innerHTML = '密码输入不一致';
		infoPw2.style.color = 'red';
		inputPw2.style.border = '2px solid redred';
	}
}

//email
function focus_email(){
	infoEmail.style.opacity ="1";
}

function validate_email(){
	var e = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	if (e.test(inputEmail.value)) {
		infoEmail.innerHTML = '邮箱格式正确';
		infoEmail.style.color = 'green';
		inputEmail.style.border = "2px solid green";
		f4=true;
	}else if (inputEmail.value == "") {
		infoEmail.innerHTML = '请输入邮箱地址';
		infoEmail.style.color = 'red';
		inputEmail.style.border = "2px solid red";
	}else{
		infoEmail.innerHTML = '请输入格式正确的邮箱地址';
		infoEmail.style.color = 'red';
		inputEmail.style.border = "2px solid red";
	}
}

//phone
function focus_phone(){
	infoPhone.style.opacity = "1";
}

function validate_phone(){
	var p = /^1(3|4|5|7|8)\d{9}$/;
	if (p.test(inputPhone.value)) {
		infoPhone.innerHTML = '号码正确';
		infoPhone.style.color = 'green';
		inputPhone.style.border = "2px solid green";
		f5=true;
	}else if (inputPhone.value =="") {
		infoPhone.innerHTML = '请输入电话号码';
		infoPhone.style.color = 'red';
		inputPhone.style.border = "2px solid red";
	}else{
		infoPhone.innerHTML = '请输入正确的电话号码';
		infoPhone.style.color = 'red';
		inputPhone.style.border = "2px solid red";
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