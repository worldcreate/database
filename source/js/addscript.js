var stringId=[
	"name","evaluation","cost","deposit",
	"reward","prefecture",
	"city","ward","address",
	"toSumi","toHigo","pair",
	"bath_wc","balcony","two_stove",
	"bicycles","merit","demerit",
	"other","url"
];

var ableNull=[
	false,true,false,false,
	false,false,
	false,true,false,
	false,false,true,
	true,true,true,
	true,true,true,
	true,false
];

var paramType=[
	"String","Int","String","String",
	"String","String",
	"String","String","String",
	"Int","Int","Int",
	"Int","Int","Int",
	"Int","String","String",
	"String","String"
];

var selectId=["prefecture","city","ward"];


function addLoad(){
	var func=function(j){
			return function(){
				if(this.readyState===4 && this.status===200){
					var box=document.getElementById(selectId[j]);
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
				}
			};
		};
	for(var i=0;i<selectId.length;i++){
		var data={table:selectId[i]};
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

// TODO
// あとは本チャンのデータをinsertするだけ
function addfromForm(){
	var production=function(data){
		xhrSend('cgi/insert.php',function(){
			if(this.readyState===4 && this.status===200){
				alert(this.responseText);
				addLoad();
			}
		},data);
	}

	var Data=new function (){
		this.data={"table":"rent"};
		this.count=0;
	}

	for(var i=0;i<stringId.length;i++){
		var ele=document.getElementById(stringId[i]);
		var value=getValue(ele);
		if(value===""){
			if(!ableNull[i]){
				var flag=false;
				for(var j=0;j<selectId.length;j++){
					if(stringId[i]==selectId[j]){
						if(document.getElementById(stringId[i]+"Input").value==""){
							break;
						}else{
							flag=true;
							var insert={"table":stringId[i]};
							insert[stringId[i]]=document.getElementById(stringId[i]+"Input").value+",String";
							var tObj=new function(){
								this.key=stringId[i];
								this.value=document.getElementById(stringId[i]+"Input").value;
								this.type=paramType[i];
							}
							xhrSend('cgi/insert.php',function(t,D){
								return function(){
									if(this.readyState===4 && this.status===200){
										var search={"table":t.key};
										search[t.key]=t.value;
										xhrSend('cgi/list.php',function(t,D){
											return function(){
												if(this.readyState===4 && this.status===200){
													var key=t.key;
													key+="_id";
													var param=this.responseText.split(",");
													D.data[key]=param[0]+","+t.type;
													if(D.count==Object.keys(D.data).length-1){
														console.log("search function");
														for(var key in Data.data){
															console.log(key+","+Data.data[key]);
														}
													}

												}
											};
										}(t,D),search);
									}
								};
							}(tObj,Data),insert);
							Data.count++;
							continue;
						}
					}
				}
				if(!flag){
					alert("データを入力してください["+stringId[i]+"]");
					return;
				}
			}
			continue;
		}
		var key=stringId[i];
		for(var j=0;j<selectId.length;j++){
			if(stringId[i]==selectId[j]){
				key+="_id";
				break;
			}
		}
		Data.data[key]=value+","+paramType[i];
		Data.count++;
	}

	if(Data.count==Object.keys(Data.data).length-1){
		console.log("function");
		for(var key in Data.data){
			console.log(key+","+Data.data[key]);
		}
	}
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