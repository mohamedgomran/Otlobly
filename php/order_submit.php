<?php 

	session_start();
	include_once '../classes/class_user.php';
	include_once '../classes/class_order.php';
	include_once '../classes/dbase.php';

	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	$room = $_POST['room']=='inplace' ? user::getRoom($userId)['room'] : $_POST['room'];
	$notes = $_POST['notes'] ? $_POST['notes'] : "";

	$newOrder = new Order($room, $notes);
	$prep = $newOrder -> addOrder($userId);
	$OID = $conn->lastInsertId();

	$sql = "insert into order_contents values ";
	foreach ($_POST as $key => $value) {
		if (preg_match('/^p_(\d*)$/',$key, $matches)) {
			$sql.="($OID, $matches[1], $value), ";
		}
	}
	$sql = substr($sql, 0, -2);

	Order::manDb($sql, array());

	echo json_encode(array('rstatus' => "submitted"));
 ?>