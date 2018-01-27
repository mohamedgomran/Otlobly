<?php
	include_once('../classes/class_user.php');

	echo json_encode(user::getUsers());
?>