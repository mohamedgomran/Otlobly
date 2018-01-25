<?php

	include_once 'dbase.php';
	class Product {

		use dataBase; 
		private $id;
		private	$name;
		private	$category;
		private $price;
		private $picture_source;
		private $availability;


		public function __construct($Id, $Name, $Category, $Price, $Picture_source, $Availability) {
			$this->id = $Id;
			$this->name = $Name;
			$this->category = $Category;
			$this->price = $Price;
			$this->picture_source = $Picture_source;
			$this->availability = $Availability;
		}

		public static function add_product() {

			$sql_add_product = "INSERT INTO cafeteria.products
			VALUES (NULL, ?, ?, ?, ?, ?);";

			$this->manDb($sql_add_product, array($name, $category, $price, $picture_source, $availability));
		}
	}














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