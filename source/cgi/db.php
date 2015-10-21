<?php
class DB{
	private $pdo;
	public function __construct()
	{
		try{
			$this->pdo=new PDO('mysql:host=mysql1.php.xdomain.ne.jp;dbname=snow_rent;charset=utf8','snow_girl','SnowGirl',
				array(PDO::ATTR_EMULATE_PREPARES=>false));
		}catch(PDOException $e){
			echo 'exit';
			exit('データベース接続失敗'.$e->getMessage());
		}
	}
	public function search($request){
		$stmt=$this->pdo->query($request);
		return $stmt;
	}
	public function insert($request){
		$data="";
		$value="";

		try{
			$index=0;
			while($request->hasNext()){
				$param=$request->getParam();
				if($data==""){
					$data=$param[0];
				}else{
					$data.=",".$param[0];
				}

				if($value==""){
					$value.=":{$param[0]}";
				}else{
					$value.=",:{$param[0]}";
				}

				$index++;

			}
		}catch(OutOfRangeException $e){
			echo $e->getMessage();
		}

		$stmt=$this->pdo->prepare("INSERT INTO ".$request->getTable()."($data) VALUES ($value)");
		if(!$stmt){
			echo "prepareできませんでした".PHP_EOL;
			echo "INSERT INTO ".$request->getTable()."($data) VALUES ($value)";
			return;
		}
		$request->setFirst();
		try{
			while($request->hasNext()){
				$param=$request->getParam();
				$stmt->bindValue(":{$param[0]}",$param[1],$param[2]);
			}
		}catch(OutOfRangeException $e){
			echo $e->getMessage();
			return ;
		}
		$stmt->execute();
		echo "1件追加しました";
	}
}

class InsertData{
	private $param;
	private $table;
	private $index;
	public function __construct($table){
		$this->table=$table;
		$this->index=0;
	}

	public function show(){
		echo "table={$this->table}".PHP_EOL;
		foreach($this->param as $line){
			foreach($line as $column){
				echo "$column ";
			}
			echo PHP_EOL;
		}
	}

	public function addParam($key,$value,$type){
		$t=array($key,$value,$type);
		$this->param[]=$t;
	}

	public function hasNext(){
		if($this->index>=count($this->param))
			return false;
		return true;
	}

	public function setFirst(){
		$this->index=0;
	}

	public function getParam(){
		if($this->index>=count($this->param))
			throw new OutOfRangeException("配列サイズを超えた参照です");
		return $this->param[$this->index++];
	}

	public function getTable(){
		return $this->table;
	}
}
?>