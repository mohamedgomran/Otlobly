<?php 
	include_once 'dbase.php';
	
	class Order {
		use dataBase;
		private $date;
		private $status;
		private $room;
		private $notes;
	
	public function __construct($id, $date, $status, $room, $notes) {
		$this->date = $date;
		$this->status = $status;
		$this->room = $room;
		$this->notes = $notes;
	} 

	public function __get($name) {
		return $this->$name;
	}

	public function __set($name, $value) {
		if (($name === "date") && is_string($value) && is_numeric($value)) {
			$this->date = $value;
		}
		else if (($name === "room") && is_integer($value)) {
			$this->room = $value;
		}
		else if (($name === "status") && (($value === "processing") || ($value === "out for delivery") || ($value === "done"))) {
			$this->status = $value;
		}
		else if (($name === "notes") && is_string($value)) {
			$this->notes = $value;
		}
	}

	public function addOrder($user_id) {
		$query = "insert into order values (null, ?)";
		$dataArr  = array($user_id, $this->date, $this->status, $this->room, $this->notes);
		$this -> manDb($query, $dataArr);
	}
}
$o = new Order("25136", "processing", 5, "Hello Gemy");
echo "$o->date\n";
echo "$o->status\n";
echo "$o->room\n";
echo "$o->notes\n";
$o.addOrder(10);
?>
