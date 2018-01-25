<?php 
	include_once 'dbase.php';
	
	class Order {
		use dataBase;
		private $id;
		private $date;
		private $status;
		private $room;
		private $notes;
	
	public function __construct($id, $date, $status, $room, $notes) {
		$this->id = $id;
		$this->date = $date;
		$this->status = $status;
		$this->room = $room;
		$this->notes = $notes;
	} 

	public function __get($name) {
		return $this->$name;
	}

	public function __set($name, $value) {
		if (($name === "id") && is_integer($value)) {
			$this->id = $value;
		}
		else if (($name === "date") && is_string($value) && is_numeric($value)) {
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

	public function addOrder($user_id, $order_id, $order_date, $order_status, $order_room, $order_notes) {
		
	}
}
$o = new Order(10,"25136", "processing", 5, "Hello Gemy");
echo "$o->id\n";
echo "$o->date\n";
echo "$o->status\n";
echo "$o->room\n";
echo "$o->notes\n";
?>
