//--------------------------------------------------------

var RadioButton=function(value){
	this.value=value;
	this.line=['<input type="checkbox" disabled>'+this.value,
				'<input type="checkbox" checked disabled>'+this.value];
};

RadioButton.prototype.at=function(arg){
	return this.line[arg];
};

var Evaluation=function(){};

Evaluation.prototype.at=function(arg){
	var text="";
	for(var i=0;i<arg;i++){
		text+="★";
	}
	if(text===""){
		text="未評価";
	}
	return text;
};

var URL=function(){};

URL.prototype.at=function(arg){
	return "<a href=\'"+arg+"\'>"+arg+"</a>";
};

//--------------------------------------------------------

var tag=["id","name","evaluation","cost","deposit","reward","prefecture",
		"city","ward","address","toSumi","toHigo","pair","bath_wc",
		"balcony","two_stove","bicycles","merit","demerit","other","url"];

var value=["@@","@@",new Evaluation(),"@@ 万円","敷金 @@ 万円","礼金 @@ 万円","@@",
		"@@","@@","@@","住道まで @@ 分","肥後橋まで @@ 分",new RadioButton("二人入居可"),new RadioButton("バストイレ別"),
		new RadioButton("バルコニー付き"),new RadioButton("二口コンロ"),new RadioButton("駐輪場付き"),"メリット @@","デメリット @@","その他 @@",new URL()];

var sort=["家賃","評価値"];

var sortName=["cost","evaluation"];

var type=["昇順","降順"];

var typeName=["asc","desc"];

//--------------------------------------------------------

function String_at() {
	var i = 0, args = arguments;
	return this.replace(/@@/g, function() { return args[i++]; });
}


String.prototype.at || Object.defineProperty(String.prototype, "at", { value: String_at });

//--------------------------------------------------------

function load(){
	var HigoSelect=document.getElementById("toHigo");
	var SumiSelect=document.getElementById("toSumi");
	var array=[HigoSelect,SumiSelect];
	array.forEach(function(e,i,a){
		e.innerHTML+="<option value=''>----</option>";
		for(var j=1;j<7;j++){
			e.innerHTML+="<option value='"+(j*10)+"'>"+(j*10)+"分以内</option>";
		}
	});

	var data={table:"prefecture"};
	xhrSend("cgi/list.php",function(){
		if(this.readyState===4 && this.status===200){
			var text=this.responseText.split("\n");
			var p=document.getElementById("prefecture");
			p.innerHTML+="<option value=''>----</option>";
			text.forEach(function(e,i,a){
				if(e==="")
					return;
				var column=e.split(",");
				var id=column[0];
				var value=column[1];
				p.innerHTML+="<option value='"+id+"'>"+value+"</option>";
			});
		}
	},data);

	data.table="city";
	xhrSend("cgi/list.php",function(){
		if(this.readyState===4 && this.status===200){
			var text=this.responseText.split("\n");
			var p=document.getElementById("city");
			p.innerHTML+="<option value=''>----</option>";
			text.forEach(function(e,i,a){
				if(e==="")
					return;
				var column=e.split(",");
				var id=column[0];
				var value=column[1];
				p.innerHTML+="<option value='"+id+"'>"+value+"</option>";
			});
		}
	},data);

	var upperSelect=document.getElementById("upperCost");
	var lowerSelect=document.getElementById("lowerCost");
	var costs=[upperSelect,lowerSelect];
	costs.forEach(function(e,i,a){
		e.innerHTML+="<option value=''>制限なし</option>";
		for(var j=0;j<41;j++){
			e.innerHTML+="<option value='"+(j*0.5)+"'>"+(j*0.5)+"万円</option>";
		}
	});
	var evaBox=document.getElementById("evaluation");
	evaBox.innerHTML="<option value=''>----</option>";
	evaBox.innerHTML+="<option value=0>未評価</option>";
	var text="";
	for(var i=1;i<6;i++){
		text+="★";
		evaBox.innerHTML+="<option value="+i+">"+text+"</option>";
	}

	var sortSelect=document.getElementById("sortType");
	sortSelect.innerHTML="<option value=''>----</option>";
	sort.forEach(function(e,i,a){
		type.forEach(function(e2,i2,a2){
			sortSelect.innerHTML+="<option value='"+i+","+i2+"'>"+e+e2+"</option>";
		});
	});

}

function call(){
	var sortValue=getSelectBoxValue("sortType").split(",");
	var sortname="";
	var sorttype="";
	if(sortValue!=""){
		sortname=sortName[sortValue[0]];
		sorttype=typeName[sortValue[1]];
	}
	var data={
		sortName:sortname,
		sortType:sorttype
	};

	xhrSend("cgi/data.php",function(){
		if(this.readyState===4 && this.status===200){
			var text=this.responseText.split("\n");
			setResponse(text);
		}
	},data);
}

function search(){
	var evaluation=getSelectBoxValue("evaluation");
	var lower=getSelectBoxValue("lowerCost");
	var upper=getSelectBoxValue("upperCost");
	var toSumi=getSelectBoxValue("toSumi");
	var toHigo=getSelectBoxValue("toHigo");
	var prefecture=getSelectBoxValue("prefecture");
	var city=getSelectBoxValue("city");
	var isPair=document.getElementById("pair").checked;
	var isBath=document.getElementById("bath").checked;
	var isBalcony=document.getElementById("balcony").checked;
	var isStove=document.getElementById("stove").checked;
	var isBicycles=document.getElementById("bicycles").checked;
	var sortValue=getSelectBoxValue("sortType").split(",");
	var sortname="";
	var sorttype="";
	if(sortValue!=""){
		sortname=sortName[sortValue[0]];
		sorttype=typeName[sortValue[1]];
	}
	var data={
				evaluation:evaluation,
				upper:upper,
				lower:lower,
				prefecture:prefecture,
				city:city,
				sumi:toSumi,
				higo:toHigo,
				pair:isPair,
				bath:isBath,
				balcony:isBalcony,
				stove:isStove,
				bicycles:isBicycles,
				sortName:sortname,
				sortType:sorttype
			};
	xhrSend("cgi/data.php",function(){
		if(this.readyState===4 && this.status===200){
			var text=this.responseText.split("\n");
			setResponse(text);
		}
	},data);
}

function getSelectBoxValue(id){
	var box=document.getElementById(id);
	return box.options[box.selectedIndex].value;
}

// HTMLフォームの形式にデータを変換する
function EncodeHTMLForm( data )
{
	var params = [];

	for( var name in data )
	{
		var value = data[ name ];
		var param = encodeURIComponent( name ) + '=' + encodeURIComponent( value );

		params.push( param );
	}

	return params.join( '&' ).replace( /%20/g, '+' );
}

function xhrOpen(url,func){
	var xhr=new XMLHttpRequest();
	xhr.open('GET',url,true);
	xhr.onreadystatechange=func;
	xhr.send(null);
}

function xhrSend(url,func,data){
	var xhr=new XMLHttpRequest();
	xhr.open('POST',url,true);
	xhr.onreadystatechange=func;
	xhr.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=UTF-8");
	xhr.send(EncodeHTMLForm(data));
}

function setResponse(text){
	var line="";
	for(var i=0;i<text.length-1;i++){
		line+="<div class=\"table\">";
		var tags=text[i].split(",");
		for(var j=0;j<tags.length;j++){
			line+="<div class=\""+tag[j]+"\">"+value[j].at(tags[j])+"</div>";
		}
		line+="</div>";
		line+="</br>\n";
	}
	line+="</div>";
	document.getElementById("response").innerHTML=line;
}