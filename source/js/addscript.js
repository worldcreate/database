function addLoad(){
	var func=function(j){
		return function(){
			var box=document.getElementById(AddedData.s_selectId[j]);
			var text=this.responseText.split('\n');
			box.innerHTML="<option value=''>----</option>";
			text.forEach(function(e,i,a){
				if(e==="")
					return;
				var column=e.split(',');
				var id=column[0];
				var value=column[1];
				box.innerHTML+="<option value='"+id+"'>"+value+"</option>";
			});
		};
	};
	console.log(AddedData.s_selectId[0]);
	for(var i=0;i<AddedData.s_selectId.length;i++){
		console.log(AddedData.s_selectId[i]);
		if(AddedData.s_selectId[i]=="")
			continue;
		var data={table:AddedData.s_selectId[i]};
		xhrSend("cgi/list.php",func(i),data);
	}
	var box=document.getElementById("evaluation");
	box.innerHTML="<option value=''>----</option>";
	var text="";
	for(i=1;i<6;i++){
		text+="★";
		box.innerHTML+="<option value="+i+">"+text+"</option>";
	}

	var button=document.getElementById("prefectureButton");
	button.addEventListener('click',function(){
		var input=document.getElementById("prefectureInput");
		if(getStyle(input).visibility=="hidden"){
			input.style.visibility="visible";
			this.innerHTML=" - ";
		}else{
			input.style.visibility="hidden";
			this.innerHTML="+";
		}
	},false);

	button=document.getElementById("cityButton");
	button.addEventListener('click',function(){
		var input=document.getElementById("cityInput");
		if(getStyle(input).visibility=="hidden"){
			input.style.visibility="visible";
			this.innerHTML=" - ";
		}else{
			input.style.visibility="hidden";
			this.innerHTML="+";
		}
	},false);

	button=document.getElementById("wardButton");
	button.addEventListener('click',function(){
		var input=document.getElementById("wardInput");
		if(getStyle(input).visibility=="hidden"){
			input.style.visibility="visible";
			this.innerHTML=" - ";
		}else{
			input.style.visibility="hidden";
			this.innerHTML="+";
		}
	},false);
}

function getStyle(element){
	return element.currentStyle || document.defaultView.getComputedStyle(element,'');
}

function production(data){
	xhrSend('cgi/insert.php',function(){
		alert(this.responseText);
		addLoad();
	},data);
}

// TODO
// あとは本チャンのデータをinsertするだけ
function addfromForm(){
	var data=new AddedData();

	for(var i=0;i<AddedData.s_stringId.length;i++){
		console.log(AddedData.s_stringId[i]);
		console.log(document.getElementById(AddedData.s_stringId[i]));
		var ele=document.getElementById(AddedData.s_stringId[i]);
		var value=getValue(ele);
		if(value===""){
			var flag=false;
			if(AddedData.s_selectId[i]!=""){
				if(document.getElementById(AddedData.s_stringId[i]+"Input").value!=""){
					flag=true;
					var insert=new Ojbect();
					insert["table"]=AddedData.s_stringId[i];
					insert[AddedData.s_stringId[i]]=document.getElementById(AddedData.s_stringId[i]+"Input").value+",String";
					xhrSend('cgi/insert.php',null,insert,false);

					var search=new Object();
					search["table"]=AddedData.s_stringId[i];
					search[AddedData.s_stringId[i]]=document.getElementById(AddedData.s_stringId[i]+"Input").value;
					var ret=xhrSend('cgi/list.php',null,search,false);

					var param=ret.responseText.split(',');
					data.addData(AddedData.s_stringId[i],param[0]);
				}
			}
			if(!flag){
				alert("データを入力してください["+AddedData.s_stringId[i]+"]");
				return;
			}
		}else{
			var key=AddedData.s_stringId[i];
			if(AddedData.s_selectId[i]!=""){
				key+="_id";
			}
			data.addData(key,value);
		}
	}
	production(data.getData());
}

function addfromUrl(){
	var urltext=document.getElementById("url").value;
	data={
		url:urltext,
		purpose:"GET"
	};
	if(urltext===""){
		alert("urlを入力してください");
		return;
	}
	xhrSend("cgi/originOpen.php",function(){
		if(this.responseText=="")
			return;
		var homesparser=new HomesParser(urltext,this.responseText);
	},data);
}

function getValue(ele){
	if(ele.tagName=="INPUT"){
		if(ele.type=="checkbox")
			if(ele.checked)
				return 1;
			else
				return "";
		return ele.value;
	}else if(ele.tagName=="SELECT"){
		return getSelectBoxValue(ele.id);
	}
}

function getSelectBoxValue(id){
	var box=document.getElementById(id);
	return box.options[box.selectedIndex].value;
}