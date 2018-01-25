<?php 

	class user
	{
		
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

	public function __set($name,$Name)
	{
		$this->name=$Name;
	}

	public function __set($email,$Email)
	{
		$this->email=$Email
	}

	public function __set($password,$Password)
	{
		$this->password=$Password
	}

	public function __set($room,$Room)
	{
		$this->room=$Room
	}

	public function __set($admin,$Admin)
	{
		$this->admin=$Admin
	}

	public function __set($picture,$Picture)
	{
		$this->picture=$Picture
	}
}
 ?>