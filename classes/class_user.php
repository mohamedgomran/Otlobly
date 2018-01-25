<?php 
	
	include_once 'dbase';
	class user
	{
		
	public use dataBase; 
	private $email
	private	$name
	private	$password
	private $room
	private $admin
	private $picture
	private $extension

	public function __construct($Email,$Name,$Password,$Room="in place",$Admin=false,$Picture=NULL,$Extension=NULL)
	{
		$this->email=$Email
		$this->name=$Name
		$this->password=$Password
		$this->room=$Room
		$this->admin=$Admin
		$this->picture=$Picture
		$this->extension=$Extension
	}

	public function __set($param,$value)
	{
		$this->param=$value;
	}
	public function __get($param)
	{
		return $this->name;
	}

	public function addUser($user)
	{
		$dsn="mysql:host=localhost;dbname="
	}
}
 ?>