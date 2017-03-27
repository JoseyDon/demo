(function (){
	var information = {
		tdwidth:'150px',
		tdHeight:'55px',
		rowNum:'5',
		colNum:'5',
		thBgc:'#333',
		border:'1px solid #ccc',
		thcontent:['姓名','语文','数学','英语','总分'],
		trcontent : [
					['小明',80,90,70,240],
					['小红',90,60,90,240],
					['小亮',60,100,70,230],
					['小强',100,70,80,250],
				     ],
	                 };

	var tab = document.getElementById('tab');
	addTh();
	addTr();

//创建th函数
function addTh(){
	var thNode = document.createElement('tr');
	var tdList;
	thNode = addTd(thNode,information.thcontent);
	thNode.style.background = information.thBgc;
	thNode.style.color = '#fff';
	thNode.style.fontWeight = "bold";
	tdList = thNode.childNodes;
	for (var i = 0; i < information.colNum; i++) {
		addUp(tdList[i]);
		addDown(tdList[i]);
	}
	tab.appendChild(thNode);
//创建排序函数
function addArrow(div,flag){
	div.style.width = "0px";
	div.style.height = "0px";
	div.style.borderLeft ="8px solid transparent";
	div.style.borderRight ="8px solid transparent";
	div.style.cursor ="pointer";
	div.style.position = "absolute";
	div.style.right = "30px";
	div.onmouseover = function(){
		div.style.borderTopColor = "#ccc";
		div.style.borderBottomColor = "#ccc";
	}
	div.onmouseout = function(){
		div.style.borderTopColor = "rgb(255, 255, 255)";
		div.style.borderBottomColor = "rgb(255, 255, 255)";
	}
	div.addEventListener('click',function(eve){
		//获取th这行的td文本
		var content = eve.target.parentNode.innerHTML.split('<')[0];
		//获取列数
		var listNum = information.thcontent.indexOf(content);
		//排序时的数组
		var sortList = [];
		//排序后的数组
		var newList = [];
		var trList = tab.childNodes;

		for (var i = 0; i < information.rowNum-1; i++) {
			sortList.push(trList[i+1].childNodes[listNum].innerHTML);
		}

		//降序数组
		newList = sortList.sort(sortNumber);
		//升序数组
		if (!flag) {
			newList = newList.reverse();
		}
		//获取当前列的数据分布情况
		sortList = [];
		for (i = 0; i < information.rowNum-1; i++) {
			sortList.push(trList[i+1].childNodes[listNum].innerHTML);
		}

		change(newList,sortList);
		function sortNumber(a,b){
			return b - a;
		}

		//改变table中的行顺序
		function change(newList,oldList){
			var len = newList.length,
			      pos_before,
			      pos_now,
			      trList = tab.childNodes,
			      tempNode = document.createElement('tr'),
			      temp;
			for(var k = 0;k<len;k++){
				//记录当前值在新表中位置，并寻找当前值在原表中的位置
				pos_now = k;
				pos_before = oldList.indexOf(newList[k]);
				//如果当前值在两个表中的位置不一样，则交换两个节点的内容
				if(pos_now !== pos_before){
					tempNode.innerHTML = trList[pos_before+1].innerHTML;
					trList[pos_before+1].innerHTML = trList[pos_now+1].innerHTML;
					trList[pos_now+1].innerHTML = tempNode.innerHTML;
					//更新表的内容
					temp = oldList[pos_before];
					oldList[pos_before] = oldList[pos_now];
					oldList[pos_now] = temp;
				}
			}
		}
	},false);
	return div;
}

function addDown(tdNode){
	var div = document.createElement('div');
	div = addArrow(div,true);
	div.style.borderTop ="10px solid #fff";
	div.style.top = "30px";
	tdNode.appendChild(div);
}
function addUp(tdNode){
	var div = document.createElement('div');
	div = addArrow(div,false);
	div.style.borderBottom ="10px solid #fff";
	div.style.top = "14px";
	tdNode.appendChild(div);
	}
}
//创建td函数
function addTd(rowNode,contentList){
	var tdNode;
	for (var i = 0; i < information.colNum; i++) {
		tdNode = document.createElement('td');
		tdNode.innerHTML = contentList[i];
		tdNode.style.width = information.tdwidth;
		tdNode.style.height = information.tdHeight;
		tdNode.style.border = information.border;
		tdNode.style.position = "relative";
		rowNode.appendChild(tdNode);
	}
	return rowNode;
}

//创建tr函数
function addTr(){
	var trNode;
	for (var i = 0; i < information.rowNum-1; i++) {
		trNode = document.createElement('tr');
		trNode = addTd(trNode,information.trcontent[i]);
		tab.appendChild(trNode);
	}
}

}());