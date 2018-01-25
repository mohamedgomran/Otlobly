<?php 
	include_once 'dbase.php';
	
	class Order {
		use dataBase;
		private $status;
		private $room;
		private $notes;
	
	public function __construct($status, $room, $notes) {
		$this->status = $status;
		$this->room = $room;
		$this->notes = $notes;
	} 

	public function __get($name) {
		return $this->$name;
	}

	public function __set($name, $value) {
		if (($name === "room") && is_integer($value)) {
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
		$query = "insert into orders (OID, o_UID, status, room, notes) values (null, ?, ?, ?, ?)";
		$dataArr  = array($user_id, $this->status, $this->room, $this->notes);
		$this -> manDb($query, $dataArr);
	}

	static function deleteOrder($order_id) {
		$query = "delete from orders where OID = ?";
		$dataArr  = array($order_id);
		Order::manDb($query, $dataArr);
	}
}
$o = new Order("processing", 5, "Hello Gemy");
//$o->addOrder(4)
//Order::deleteOrder(783);
?>
