<?php

// Class category, has attribute of name as string

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

	// void addCategory(); add catgory to database

	public function addCategory()
	{
		$query = "insert into categories values (null, ?)";
		$dataArr  = array($this -> name);
		$this -> manDb($query, $dataArr);
	}

	// static::array getCategory(); get all categories from database


	static function getCategory()
	{
		$query = "select * from categories";
		$dataArr  = array('');
		$prep = category::manDb($query, $dataArr);
		$result = $prep->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

}

?>