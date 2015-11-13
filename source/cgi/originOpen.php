<?php
	if($_POST['purpose']=="GET"){
		$t=time();
		$url = $_POST['url']."?".$t;
		$data = "";
		$cp = curl_init();
		curl_setopt($cp, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($cp, CURLOPT_URL, $url);
		curl_setopt($cp, CURLOPT_TIMEOUT, 60);
		$data = curl_exec($cp);
		curl_close($cp);
		echo $data;
	}else if($_POST['purpose']=="POST"){
		$POST_DATA=array();
		$values=explode(',',$_POST['value']);
		foreach($values as $v){
			$a=explode(':',$v);
			$POST_DATA[$a[0]]=$a[1];
		}

		$curl=curl_init($_POST['url']);
		curl_setopt($curl,CURLOPT_POST,TRUE);
		curl_setopt($curl,CURLOPT_POSTFIELDS,http_build_query($POST_DATA));
		curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,FALSE);
		curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,FALSE);
		curl_setopt($curl,CURLOPT_RETURNTRANSFER,TRUE);
		curl_setopt($curl,CURLOPT_COOKIEJAR,'cookie');
		curl_setopt($curl,CURLOPT_COOKIEFILE,'tmp');

		$data=curl_exec($curl);
		echo $data;
	}
?>