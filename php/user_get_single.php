<?php
	session_start();
	require_once '../classes/dbase.php';
	require_once '../classes/class_user.php';
	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	if ($userId) {
		if (user::isAdmin($userId)) 
		{

			echo json_encode(user::getSingleUserById($_POST['uId']));
		}
		else 
		{
			echo json_encode (array('status'=>'go', 'link'=>'user_home.html'));
		}
		
	}
	else 
	{
		echo json_encode (array('status'=>'go', 'link'=>'login.html'));
	}

?>