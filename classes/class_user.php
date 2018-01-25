
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
	private $UID;

	public function __construct($UserName,$Password,$Room,$Admin=false,$Picture=NULL,$Extension=NULL)
	{
		$this->userName=$UserName;
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
		
		$query = "insert into Users values(null,?,?,?,?,?,?)";
		$parameters=["$this->userName","$this->room","$this->extension","$this->password","$this->picture","$this->admin"];
		$this->manDb($query,$parameters);
	}

	public function removeUser()
	{
		$query = "delete from Users where id=?";
		$parameters=["$this->UID"];
		$this->manDb($query,$parameters);
	}




















	static function getUser()
	{
		$query = "select * from users";
		$dataArr  = array('');
		$prep = user::manDb($query, $dataArr);
		$result = $prep->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}


}
// $usr =new user("ahmed",125,1515);
// $usr->addUser();
print_r(user::getUser());

 ?>