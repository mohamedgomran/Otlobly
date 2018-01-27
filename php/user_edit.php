<?php
	include_once('../classes/class_user.php');

	$email = ''

	$single_user_info = user::getSingleUser($email);

	print_r($single_user_info);

	// echo json_encode(user::getUsers());

?>