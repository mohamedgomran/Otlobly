<?php
	session_start();
	include_once '../classes/class_user.php';
	

	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	if ($userId) 
	{
		if (user::isAdmin($userId))
			{
				echo json_encode(array('admin'=>"true"));
			}
		else{echo json_encode(array('admin'=>"false"));}

	}
	else
	{
			echo json_encode(array('admin'=>"false"));
	}
  ?>