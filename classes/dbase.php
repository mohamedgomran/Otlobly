<?php  

// Train to manipulate the data base, recives the PDO connection obj, 
// Sql statment with positional placeholder and the data array
// it prepares the statment and executes it, returning the prepared statment
	trait dataBase{
		function manDb ($conn, $sql, $dataarr){

			$prep = $conn->prepare($sql);
			$prep->execute($dataarr);
			return $prep;
		}

	}
?>
