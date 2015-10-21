<?php
	require('db.php');

	$request="SELECT * FROM rentView";
	$condition="";
	if(count($_POST)>0){
		if($_POST['evaluation']!=""){
			if($condition!="")
				$condition=" and ";
			$condition.=" evaluation=".$_POST['evaluation'];
		}
		$upper=$_POST['upper'];
		$lower=$_POST['lower'];
		if($upper!="" && $lower!=""){
			if($condition!="")
				$condition.=" and ";
			$condition.=" cost between {$lower} and {$upper}";
		}elseif($lower!=""){
			if($condition!="")
				$condition.=" and ";
			$condition.=" cost >={$lower}";
		}elseif($upper!=""){
			if($condition!="")
				$condition.=" and ";
			$condition.=" cost <={$upper}";
		}
		if($_POST['prefecture']!=""){
			if($condition!="")
				$condition.=" and ";
			$condition.=" prefecture_id=".$_POST['prefecture'];
		}
		if($_POST['city']!=""){
			if($condition!="")
				$condition.=" and ";
			$condition.=" city_id=".$_POST['city'];
		}
		if($_POST['sumi']!=""){
			if($condition!="")
				$condition.=" and ";
			$condition.=" toSumi<".$_POST['sumi'];
		}
		if($_POST['higo']!=""){
			if($condition!="")
				$condition.=" and ";
			$condition.=" toHigo<".$_POST['higo'];
		}
		if($_POST['pair']=='true'){
			if($condition!="")
				$condition.=" and ";
			$condition.=" pair=1";
		}
		if($_POST['bath']=='true'){
			if($condition!="")
				$condition.=" and ";
			$condition.=" bath_wc=1";
		}
		if($_POST["balcony"]=='true'){
			if($condition!="")
				$condition.=" and ";
			$condition.=" balcony=1";
		}
		if($_POST["stove"]=='true'){
			if($condition!="")
				$condition.=" and ";
			$condition.=" two_stove=1";
		}
		if($_POST["bicycles"]=='true'){
			if($condition!="")
				$condition.=" and ";
			$condition.=" bicycles=1";
		}
	}
	if($condition!=""){
		$request=$request." where".$condition;
	}
	$db=new DB();
	$response=$db->search($request);
	foreach($response as $row){
		$id=$row["id"];
		$name=$row["name"];
		$evaluation=$row["evaluation"];
		$cost=$row["cost"];
		$deposit=$row["deposit"];
		$reward=$row["reward"];
		$prefecture=$row["prefecture"];
		$city=$row["city"];
		$ward=$row["ward"];
		$address=$row["address"];
		$toSumi=$row["toSumi"];
		$toHigo=$row["toHigo"];
		$pair=$row["pair"];
		$bath_wc=$row["bath_wc"];
		$balcony=$row["balcony"];
		$two_stove=$row["two_stove"];
		$bicycles=$row["bicycles"];
		$merit=$row["merit"];
		$demerit=$row["demerit"];
		$other=$row["other"];
		$url=$row["url"];
		echo "$id,$name,$evaluation,$cost,$deposit,$reward,$prefecture,$city,$ward,$address,$toSumi,$toHigo,$pair,$bath_wc,$balcony,$two_stove,$bicycles,$merit,$demerit,$other,$url\n";
	}
?>
