<?php 

	session_start();
	include_once '../classes/class_user.php';

	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	if ($userId) {
		if (user::isAdmin($userId)) {
			echo json_encode(array('rstatus'=>'go', 'link'=>'admin_home.html'));
		}
		else{
			echo json_encode(array('rstatus'=>'logged'));
		}
	}
	else{
		echo json_encode(array('rstatus'=>'login'));
		exit;
	}



 ?>