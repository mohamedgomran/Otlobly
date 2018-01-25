<?php  
	trait dataBase{
		function manDb ($conn, $sql, $dataarr){

			$prep = $conn->prepare($sql);
			$prep->execute($dataarr);
			return $prep;
		}

	}
?>
