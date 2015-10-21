<?php
	require('db.php');
	$insertdata=new InsertData($_POST['table']);

	foreach($_POST as $key => $value){
		if($key=="table")
			continue;
		$param=explode(',',$value);
		$insertdata->addParam($key,$param[0],getParamType($param[1]));
	}

	$db=new DB();
	$db->insert($insertdata);

function getParamType($type){
	if($type=="String")
		return PDO::PARAM_STR;
	if($type=="Int")
		return PDO::PARAM_INT;
}
?>