var HomesParser=function(url,text){
	var domParser=new DOMParser();
	var dom=domParser.parseFromString(text,"text/html");

	this.name=dom.getElementById("chk-bkh-name").innerHTML+dom.getElementById("chk-bkh-room").innerHTML;	// name

	this.cost=Number(dom.getElementById("chk-bkc-moneyroom").childNodes[0].childNodes[0].innerHTML);	// cost

	var shikirei=dom.getElementById("chk-bkc-moneyshikirei").innerHTML.split("/");
	var shiki=shikirei[0];

	var shikiNum=shiki.match(/[0-9]+/);
	if(shikiNum!==null){
		shikiNum=shikiNum[0];
		if(shiki.match(/ヶ月/)!==null){
			this.shikiCost=shikiNum*this.cost;
		}else if(shiki.match(/万円/)!==null){
			this.shikiCost=shikiNum;
		}
	}else{
		this.shikiCost=0;
	}

	var rei=shikirei[1];

	var reiNum=rei.match(/[0-9]+/);
	if(reiNum!==null){
		reiNum=reiNum[0];
		if(rei.match(/ヶ月/)!==null){
			this.reiCost=reiNum*this.cost;
		}else if(rei.match(/万円/)!==null){
			this.reiCost=reiNum;
		}
	}else{
		this.reiCost=0;
	}

	var fulladdress=dom.getElementById("chk-bkc-fulladdress").innerHTML.match(/[^ ]*府[^ ]*市.*/)[0];
	this.prefecture=fulladdress.match(/.*府/)[0]||fulladdress.match(/.*県/)[0];
	fulladdress=fulladdress.slice(-(fulladdress.length-this.prefecture.length));
	this.city=fulladdress.match(/.*市/)[0];
	fulladdress=fulladdress.slice(-(fulladdress.length-this.city.length));
	this.ward=fulladdress.match(/.*区/);
	if(this.ward!==null){
		this.ward=this.ward[0];
		fulladdress=fulladdress.slice(-(fulladdress.length-this.ward.length));
	}else{
		this.ward="";
	}
	
	var urlsplit=url.split('?')[0].split('/');
	var unique=urlsplit[urlsplit.length-2];

	var data={
		purpose:"POST",
		url:"https://www.homes.co.jp/_ajax/detail/transit/chintai/"+unique+"/",
		value:"cond[commute_eki][0]:肥後橋,cond[commute_eki][1]:住道"
	};
	var ret=xhrSend("cgi/originOpen.php",null,data,false);
	var domTrans=domParser.parseFromString(ret.responseText,"text/html");
	t.toHigo=domTrans.getElementsByClassName("time")[0].innerHTML.match(/[0-9]+/)[0];
	t.toSumi=domTrans.getElementsByClassName("time")[1].innerHTML.match(/[0-9]+/)[0];

	this.pair=false;
	this.bath=false;
	this.stove=false;
	this.balcony=false;
	this.bicycle=false;
	for(var i=1;i<6;i++){
		var setsubi=dom.getElementById("chk-bkf-setsubi"+i);
		if(setsubi===null)
			continue;
		this.pair=setsubi.innerHTML.match(/二人入居可/)!==null|this.pair;	// 二人入居可
		this.bath=setsubi.innerHTML.match(/バス・トイレ別/)!==null|this.bath;	// バストイレ
		this.stove=setsubi.innerHTML.match(/コンロ二口/)!==null|this.stove;	// 二口コンロ
		this.balcony=setsubi.innerHTML.match(/バルコニー/)!==null|this.balcony;	// バルコニー
		this.bicycle=setsubi.innerHTML.match(/駐輪場/)!==null|this.bicycle;	// 駐輪場
	}
};

HomesParser.prototype.getName=function(){
	return this.name;
};

HomesParser.prototype.getCost=function(){
	return this.cost;
};

HomesParser.prototype.getReiCost=function(){
	return this.reiCost;
};

HomesParser.prototype.getShikiCost=function(){
	return this.shikiCost;
};

HomesParser.prototype.getPrefecture=function(){
	return this.prefecture;
};

HomesParser.prototype.getCity=function(){
	return this.city;
};

HomesParser.prototype.getWard=function(){
	return this.ward;
};

HomesParser.prototype.getAddress=function(){
	return this.address;
};

HomesParser.prototype.getSumi=function(){
	return this.toSumi;
};

HomesParser.prototype.getHigo=function(){
	return this.toHigo;
};

HomesParser.prototype.getPair=function(){
	return this.pair;
};

HomesParser.prototype.getBath=function(){
	return this.bath;
};

HomesParser.prototype.getBalcony=function(){
	return this.balcony;
};

HomesParser.prototype.getStove=function(){
	return this.stove;
};

HomesParser.prototype.getBicycle=function(){
	return this.bicycle;
};
