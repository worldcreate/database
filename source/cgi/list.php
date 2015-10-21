<?php
	require('db.php');

	$request="SELECT * FROM ".$_POST['table'];

	foreach($_POST as $key => $value){
		if($key=='table')
			continue;
		$request.=" WHERE $key = '$value'";
	}
	$db=new DB();
	$response=$db->search($request);

	foreach($response as $row){
		$id=$row[0];
		$data=$row[1];
		echo "$id,$data\n";
	}
?>