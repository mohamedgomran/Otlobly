<?php
	include_once('../classes/class_user.php');

	$sql = "select userName, UID from users";
	$prep = user::manDb($sql, array());
	$res=$prep->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($res);

?>