var HomesParser=function(url,text){
	var domParser=new DOMParser();
	var dom=domParser.parseFromString(text,"text/html");

	console.log("url:"+url);
	this.name=dom.getElementById("chk-bkh-name").innerHTML+dom.getElementById("chk-bkh-room").innerHTML;	// name
	console.log("name:"+this.name);

	this.cost=dom.getElementById("chk-bkc-moneyroom").childNodes[0].childNodes[0].innerHTML;	// cost
	console.log("cost:"+this.cost);

	var shikirei=dom.getElementById("chk-bkc-moneyshikirei").innerHTML.split("/");
	var shiki=shikirei[0];

	var shikiNum=shiki.match(/[0-9]*/);
	if(shiki.match(/ヶ月/)!=null){
		this.shikiCost=shikiNum*this.cost;
	}else if(shiki.match(/万円/)!=null){
		this.shikiCost=shikiNum;
	}
	console.log("敷金:"+this.shikiCost);	// 敷金

	var rei=shikirei[1];

	var reiNum=rei.match(/[0-9]*/);
	if(rei.match(/ヶ月/)!=null){
		this.reiCost=reiNum*this.cost;
	}else if(rei.match(/万円/)!=null){
		this.reiCost=reiNum;
	}
	console.log("礼金:"+this.reiCost);	// 礼金

	var fulladdress=dom.getElementById("chk-bkc-fulladdress").innerHTML.match(/[^ ]*府[^ ]*市.*/)[0];
	this.prefecture=fulladdress.match(/.*府/)[0]||fulladdress.match(/.*県/)[0];
	fulladdress=fulladdress.slice(-(fulladdress.length-this.prefecture.length));
	this.city=fulladdress.match(/.*市/)[0];
	
	console.log(dom.getElementById("chk-bkc-fulladdress").innerHTML);

	var urlsplit=url.split('/');
	var unique=urlsplit[urlsplit.length-2];

	var data={
		purpose:"POST",
		url:"https://www.homes.co.jp/_ajax/detail/transit/chintai/"+unique+"/",
		value:"cond[commute_eki][0]:肥後橋,cond[commute_eki][1]:住道"
	};
	xhrSend("cgi/originOpen.php",function(){
		var domTransParser=new DOMParser();
		var domTrans=domTransParser.parseFromString(this.responseText,"text/html");
		Array.prototype.forEach.call(domTrans.getElementsByClassName("station"),function(e,i,a){
			console.log(e.innerHTML);
		});
		Array.prototype.forEach.call(domTrans.getElementsByClassName("time"),function(e,i,a){
			console.log(e.innerHTML);
		});

	},data);

	dom.getElementById("chk-bkf-setsubi1").innerHTML;	// 二人入居可
	dom.getElementById("chk-bkf-setsubi2").innerHTML;	// バストイレ、二口コンロ
	dom.getElementById("chk-bkf-setsubi3").innerHTML;	// バルコニー、駐輪場

}

