<?php
	session_start();
	// require_once '../classes/dbase.php';
	// require_once '../classes/class_user.php';

	$name=!empty($_POST['name'])?$_POST['name']:"";
	$email=!empty($_POST['email'])?$_POST['email']:"";
	$password=!empty($_POST['password'])?$_POST['password']:"";
	$duplPassword=!empty($_POST['confirm_password'])?$_POST['confirm_password']:"";
	$room=!empty($_POST['room_no'])?$_POST['room_no']:"";
	$extension=!empty($_POST['ext'])?$_POST['ext']:"";
	$picture=!empty($_POST['picture'])?$_POST['picture']:"";
	// $admin=flase;
	$errors=[];

	if (preg_match('/^[a-zA-Z ]{2,30}$/',$name))
		{echo "correct";}
	else {array_push($errors, "name");}
	
	// $searchArray=user::getSingleUser($email);
	// if(empty($searchArray))
	// {
	// 	$newUser= new user($name,$email,$password,$room,$admin,$picture,$extension);
	// 	$newUser->addUser();

	// }

 ?>