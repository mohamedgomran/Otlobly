<?php
	session_start();
	include_once '../classes/class_user.php';
	include_once '../classes/class_products.php';

	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	if ($userId) 
	{
		$userRow=user::getSingleUserById($userId);
		$name=$userRow['userName'];
		$result=array('userName'=>$name,'userId'=>$userId);	
		echo json_encode($result);
	}
	else
	{
		echo json_encode(array('status'=>'error','link'=>'login.html'));
	}
?>

