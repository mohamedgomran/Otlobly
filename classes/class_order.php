<?php
	# This class is reponsible for handling user's order
	# User can add an order and cancel an order
	
	include_once 'dbase.php';
	
	class Order {
		use dataBase;
		private $status;
		private $room;
		private $notes;
	
		# order's constructor
		# parameters: order's status, order's room and order notes
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

		# add order function called by an order object
		public function addOrder($user_id) {
			$query = "insert into orders (OID, o_UID, status, room, notes) values (null, ?, ?, ?, ?)";
			$dataArr  = array($user_id, $this->status, $this->room, $this->notes);
			$this -> manDb($query, $dataArr);
		}

		# cancel order function called by Order class
		static function cancelOrder($order_id) {
			$query = "delete from orders where OID = ?";
			$dataArr  = array($order_id);
			Order::manDb($query, $dataArr);
		}
}
?>
