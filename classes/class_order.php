<?php 
	include_once 'dbase.php';
	
	class Order {
		use dataBase;
		public $date;
		public $status;
		public $room;
		public $notes;

	public function __get($name) {
		return $this->$name;
	} 

	public function __set($name, $value) {
		if ($name === "date" && is_string($value) && is_numeric($value)) {
			$this->date = $value;
		}
		else if ($name === "room" && is_integer($value)) {
			$this->room = $value;
		}
		else if ($name === "status" && ($value === "processing" || $value === "out for delivery" || $value === "done")) {
			$this->status = $value;
		}
		else if ($name === "notes" && is_string($value)) {
			$this->notes = $value;
		}
	}
}
?>