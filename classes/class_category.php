<?php

// Class category, has attribute of name as string
// void addCatefory(); add catgoty to database

	include_once 'dbase.php';
	
	class category
	{
		
	use dataBase; 
	private	$name;


	public function __construct($Name)
	{
		$this->name=$Name;
	}

	public function __set($param,$value)
	{
		$this->$param=$value;
	}
	public function __get($param)
	{
		return $this->$param;
	}

	public function addCategory()
	{
		$query = "insert into categories values (null, ?)";
		$dataArr  = array($this -> __get("name"));
		$this -> manDb($query, $dataArr);
	}

	static function getCategory()
	{
		$query = "select * from categories";
		$dataArr  = array();
		$prep = category::manDb($query, $dataArr);
		$result = $prep->fetch(PDO::FETCH_ASSOC);
		return $result;
	}

}



print_r(category::getCategory());

?>