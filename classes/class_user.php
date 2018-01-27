
<?php 
	
	include_once 'dbase.php';
	class user
	{
		
	use dataBase; 
	private $email;
	private	$name;
	private	$password;
	private $room;
	private $admin;
	private $picture;
	private $extension;

	public function __construct($UserName,$email,$Password,$Room,$Admin=false,$Picture=NULL,$Extension=NULL)
	{
		$this->userName=$UserName;
		$this->email=$email;
		$this->password=$Password;
		$this->room=$Room;
		$this->admin=$Admin;
		$this->picture=$Picture;
		$this->extension=$Extension;
	}

	public function __set($param,$value)
	{
		$this->$param=$value;
	}
	public function __get($param)
	{
		return $this->$param;
	}
	
	public function addUser()
	{
		
		$query = "insert into users values(null,?,?,?,?,?,?,?)";
		$parameters=["$this->userName","$this->email","$this->room","$this->extension","$this->password","$this->picture","$this->admin"];
		$this->manDb($query,$parameters);
	}

	static function removeUser($id)
	{
		echo 'hi';

		$query = "delete from users where UID=?";
		$parameters=[$id];
		user::manDb($query,$parameters);
	}

	static function getUsers()
	{
		$query = "select * from all_users";

		$dataArr  = array('');
		$prep = user::manDb($query, $dataArr);
		$result = $prep->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	static function isAdmin($id)
	{
		$query = "select admin from users where UID=?";

		$dataArr  = array($id);
		$prep = user::manDb($query, $dataArr);
		$result = $prep->fetch(PDO::FETCH_ASSOC);
		return $result['admin'];
	}

	static function getSingleUser($email)
	{
		$query = "select * from users where email=?";
		$parameters = ["$email"];
		$prep = user::manDb($query, $parameters);
		$result = $prep->fetch(PDO::FETCH_ASSOC);
		return $result;
	}

	static function getSingleUserById($Id)
	{
		$query = "select * from users where UID=?";
		$parameters = ["$Id"];
		$prep = user::manDb($query, $parameters);
		$result = $prep->fetch(PDO::FETCH_ASSOC);
		return $result;
	}
	
	public function editUser($id)
	{
		$query="update users set userName=? , email=? , room=? , extension=? , password=?, picture=? , admin=? where UID=$id";
		$parameters=["$this->userName","$this->email","$this->room","$this->extension","$this->password","$this->picture","$this->admin"];
		$this->manDb($query,$parameters);
	}

	static function getRoom($id)
	{
		$query="select room from users where UID=?";
		$parameters=["$id"];
		$prep=user::manDb($query,$parameters);
		$result=$prep->fetch(PDO::FETCH_ASSOC);
		return $result;
	}

	static function getRooms()
	{
		$query="select room from users";
		$parameters=[""];
		$prep=user::manDb($query,$parameters);
		$result=$prep->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}
}


 ?>