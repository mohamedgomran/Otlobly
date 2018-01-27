<?php 

	session_start();
	include_once '../classes/class_user.php';
	include_once '../classes/class_products.php';

	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	if ($userId) {
		if (user::isAdmin($userId)) {
			echo json_encode(array('rstatus'=>'go', 'link'=>'admin_home.html'));
		}
	}
	else{
		echo json_encode(array('rstatus'=>'login'));
		exit;
	}
	$userRow=user::getSingleUserById($userId);
	$name=$userRow['userName'];
	$res = Product::get_available_products();
	array_push($res,$name);
	array_push($res,$userId);	
	echo json_encode($res);

 ?>