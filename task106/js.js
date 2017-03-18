document.getElementById("radio-select").onchange =function radioChange() {
    if (document.getElementById("inSchoolRadio").checked) {
        document.querySelector(".inSchool").className = "inSchool";
        document.querySelector(".outSchool").className = "outSchool hide";
    }
    else {
        document.querySelector(".inSchool").className = "inSchool hide";
        document.querySelector(".outSchool").className = "outSchool";
    }
}

document.getElementById("select1").onchange = function selectChange(){
	var data ={
		bj:["北京大学","清华大学","中国传媒大学"],
		sh:["上海大学","复旦大学","上海交通大学"],
		cq:["重庆大学","西南大学","重庆邮电大学"]
	}
	var place = document.getElementById("select1");
	var university = document.getElementById("select2");
	var selected = place.options[place.selectedIndex].value;
	university.innerHTML = "";
	for (var i = 0; i < data[selected].length; i++) {
		var opt = document.createElement("option");
		opt.value = data[selected][i];
		opt.innerHTML = data[selected][i];
		document.getElementById("select2").appendChild(opt);
	}

}
