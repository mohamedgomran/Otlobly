<?php
	include_once('../classes/class_user.php');

	$sql = "select name from userName";
	$res = user::manDb($sql, array());
	echo json_encode($res);

?>