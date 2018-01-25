<?php  


	$dsn="mysql:host=192.168.1.3;dbname=cafeteria";
	$conn= new PDO($dsn,"Otlobly","iti38");
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Train to manipulate the data base, recives the PDO connection obj, 
// Sql statment with positional placeholder and the data array
// it prepares the statment and executes it, returning the prepared statment
	trait dataBase{
		public function manDb ($sql, $dataarr){
			global $conn;
			$prep = $conn->prepare($sql);
			$prep->execute($dataarr);
			return $prep;
		}

	}
?>
