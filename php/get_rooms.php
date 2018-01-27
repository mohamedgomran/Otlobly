<?php
	require_once '../classes/dbase.php';
	require_once '../classes/class_user.php';

	$roomArr=user::getRooms();
	echo json_encode(array('get'=>'room','rooms'=>$roomArr));
?>