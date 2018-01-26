<?php  

// need to set a global CONFIG_HOST and CONFIG_PASSWORD and CONFIG_DB
// as well as CONFIG_USER CONFIG_USER_PASSWORD
	$dsn="mysql:host=localhost;dbname=cafeteria";
	$conn= new PDO($dsn,"mhassan","iti38");
	
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
