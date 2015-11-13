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

var Data=function(){
	this.evaluation="";
	this.lower="";
	this.upper="";
	this.toSumi="";
	this.toHigo="";
	this.prefecture="";
	this.city="";
	this.isPair="";
	this.isBath="";
	this.isBalcony="";
	this.isStove="";
	this.isBicycles="";
	this.sortValue="";
	this.sortname="";
	this.sorttype="";
	this.data="";
	this.sortName=["cost","evaluation"];
	this.typeName=["asc","desc"];
};

Data.prototype.getSelectBoxValue=function(id){
	var box=document.getElementById(id);
	return box.options[box.selectedIndex].value;
}

Data.prototype.loadData=function(){
	this.evaluation=this.getSelectBoxValue("evaluation");
	this.lower=this.getSelectBoxValue("lowerCost");
	this.upper=this.getSelectBoxValue("upperCost");
	this.toSumi=this.getSelectBoxValue("toSumi");
	this.toHigo=this.getSelectBoxValue("toHigo");
	this.prefecture=this.getSelectBoxValue("prefecture");
	this.city=this.getSelectBoxValue("city");
	this.isPair=document.getElementById("pair").checked;
	this.isBath=document.getElementById("bath").checked;
	this.isBalcony=document.getElementById("balcony").checked;
	this.isStove=document.getElementById("stove").checked;
	this.isBicycles=document.getElementById("bicycles").checked;
	this.sortValue=this.getSelectBoxValue("sortType").split(",");
	if(this.sortValue!=""){
		this.sortname=this.sortName[this.sortValue[0]];
		this.sorttype=this.typeName[this.sortValue[1]];
	}
	this.data={
		evaluation:this.evaluation,
		upper:this.upper,
		lower:this.lower,
		prefecture:this.prefecture,
		city:this.city,
		sumi:this.toSumi,
		higo:this.toHigo,
		pair:this.isPair,
		bath:this.isBath,
		balcony:this.isBalcony,
		stove:this.isStove,
		bicycles:this.isBicycles,
		sortName:this.sortname,
		sortType:this.sorttype
	};
};

Data.prototype.loadSort=function(){
	this.sortValue=this.getSelectBoxValue("sortType").split(",");
	if(this.sortValue!=""){
		this.sortname=this.sortName[this.sortValue[0]];
		this.sorttype=this.typeName[this.sortValue[1]];
	}
	this.data={
		sortName:this.sortname,
		sortType:this.sorttype
	};
}

Data.prototype.getData=function(){
	return this.data;
}

//--------------------------------------------------------

var tag=["id","name","evaluation","cost","deposit","reward","prefecture",
		"city","ward","address","toSumi","toHigo","pair","bath_wc",
		"balcony","two_stove","bicycles","merit","demerit","other","url"];

var value=["@@","@@",new Evaluation(),"@@ 万円","敷金 @@ 万円","礼金 @@ 万円","@@",
		"@@","@@","@@","住道まで @@ 分","肥後橋まで @@ 分",new RadioButton("二人入居可"),new RadioButton("バストイレ別"),
		new RadioButton("バルコニー付き"),new RadioButton("二口コンロ"),new RadioButton("駐輪場付き"),"メリット @@","デメリット @@","その他 @@",new URL()];

var sort=["家賃","評価値"];

var type=["昇順","降順"];
//--------------------------------------------------------

function String_at() {
	var i = 0, args = arguments;
	return this.replace(/@@/g, function() { return args[i++]; });
}


String.prototype.at || Object.defineProperty(String.prototype, "at", { value: String_at });

//--------------------------------------------------------

// 継承を可能にするための関数
function inherits(ctor,superCtor){
	ctor.super_=superCtor;
	ctor.prototype=Object.create(superCtor.prototype,{
		constructor:{
			value:ctor,
			enumerable:false,
			writable:true,
			configurable:true
		}
	});
}

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
	},data);

	data.table="city";
	xhrSend("cgi/list.php",function(){
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
	var d=new Data();
	d.loadSort();

	xhrSend("cgi/data.php",function(){
		var text=this.responseText.split("\n");
		setResponse(text);
	},d.getData());
}

function search(){
	var d=new Data();
	d.loadData();

	xhrSend("cgi/data.php",function(){
		var text=this.responseText.split("\n");
		setResponse(text);
	},d.getData());
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

function xhrOpen(url,func,async){
	if(async==null)
		async=true;
	var xhr=new XMLHttpRequest();
	xhr.open('GET',url,async);
	xhr.onreadystatechange=function(){
		if(this.readyState===4 && this.status===200){
			func.call(this);
		}
	};
	xhr.send(null);
	return xhr;
}

function xhrSend(url,func,data,async){
	if(async==null)
		async=true;
	var xhr=new XMLHttpRequest();
	xhr.open('POST',url,async);
	xhr.onreadystatechange=function(){
		if(this.readyState===4 && this.status===200){
			func.call(this);
		}
	};
	xhr.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=UTF-8");
	xhr.send(EncodeHTMLForm(data));
	return xhr;
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