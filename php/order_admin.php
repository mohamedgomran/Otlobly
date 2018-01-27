<?php 

	session_start();
	include_once '../classes/class_user.php';
	include_once '../classes/class_products.php';

	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	if ($userId) {
		if (!user::isAdmin($userId)) {
			echo json_encode(array('rstatus'=>'go', 'link'=>'user_home.html'));
			exit;
		}
	}
	else{
		echo json_encode(array('rstatus'=>'login'));
		exit;
	}

	$res = Product::get_available_products();
	echo json_encode($res);

 ?>