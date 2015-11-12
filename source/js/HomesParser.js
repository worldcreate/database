var HomesParser=function(url,text){
	var domParser=new DOMParser();
	var dom=domParser.parseFromString(text,"text/html");

	console.log("url:"+url);
	console.log(dom.getElementById("chk-bkh-name").innerHTML);
	console.log(dom.getElementById("chk-bkh-room").innerHTML);
	console.log(dom.getElementById("chk-bkc-moneyroom").innerHTML);
	console.log(dom.getElementById("chk-bkc-moneyshikirei").innerHTML);
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

