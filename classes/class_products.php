<?php

	include_once 'dbase.php';
	class Product {

		use dataBase; 
		// private $id;
		private	$name;
		private	$category;
		private $price;
		private $picture_source;
		private $availability;


		public function __construct($Name, $Category, $Price, $Picture_source, $Availability) {
			$this->name = $Name;
			$this->category = $Category;
			$this->price = $Price;
			$this->picture_source = $Picture_source;
			$this->availability = $Availability;
		}


		public function add() {

			$sql_add_product = "INSERT INTO cafeteria.products
			VALUES (NULL, ?, ?, ?, ?, ?);";

			$parameters = ["$this->name, $this->category, $this->price, $this->picture_source, $this->availability"];

			$this->manDb($sql_add_product, $parameters);
		}


		public function edit($Id) {

			$sql_edit_product = "UPDATE cafeteria.products
			SET
			pname = ?,
			p_CID = ?,
			price = ?,
			picture = ?,
			availability = ?
			WHERE PID = ?;";

			$parameters = ["$this->name, $this->category, $this->price, $this->picture_source, $this->availability, $Id"];

			$this->manDb($sql_edit_product, $parameters);
		}


		public static function remove($Id) {

			$sql_remove_product = "DELETE FROM cafeteria.products WHERE PID = ?;";

			$parameters = ["$Id"];

			Product::manDb($sql_remove_product, $parameters);
		}


		public function set_availability($Id) {
			
			$sql_set_availability = "UPDATE cafeteria.products
			SET
			availability = ?
			WHERE PID = ?;";

			$parameters = ["$this->availability, $Id"];

			$this->manDb($sql_edit_product, $parameters);
		}

	}

Product::remove(11);












	// function manDb ($conn, $sql, $dataarr){

	// 	$prep = $conn->prepare($sql);
	// 	$prep->execute($dataarr);
	// 	return $prep;
	// }

	// $dsn = "mysql:host=192.168.1.3;dbname=cafeteria";
	// $conn_pdo = new PDO($dsn, 'Otlobly', 'iti38');
	// $conn_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	// $sql_add_product = "INSERT INTO cafeteria.products
	// 		(PID, Pname, P_CID, price, picture, availability)
	// 		VALUES (?, ?, ?, ?, ?, ?);";

	// manDb($conn_pdo, $sql_add_product, array(13, 'a', 1, 1, 'a', 1));


?>