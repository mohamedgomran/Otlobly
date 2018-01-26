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
	else{
			array_push($errors, "name");
			echo "incorrect";
		}

	if (preg_match('/\S+@\S+\.\S+/',$email))
		{echo "correct";}
	else{
			array_push($errors, "name");
			echo "incorrect";
		}

	if (preg_match('/^[a-zA-Z0-9_$@#!%&*^~]{8,}$/',$password) && $password===$duplPassword)
		{
				echo "correct";
		}
	else{
			array_push($errors, "password");
			echo "incorrect";
		}

	if (preg_match('/^[0-9]$/',$room))
		{echo "correct";}
	else{
			array_push($errors, "room");
			echo "incorrect";
		}

	if (preg_match('/^[0-9]$/',$extension))
		{echo "correct";}
	else{
			array_push($errors, "extension");
			echo "incorrect";
		}

	if (preg_match('/^\S+\.(jpg|JPG|png|PNG)/',$picture))
		{echo "correct";}
	else{
			array_push($errors, "picture");
			echo "incorrect";
		}

	if($errors)
	{
		echo json_encode("$errors");
	}

	else
	{
		$searchArray=user::getSingleUser($email);
		if(empty($searchArray))
		{
			$newUser= new user($name,$email,sha1($password),$room,$admin,$picture,$extension);
			$newUser->addUser();

		}
	}
	
	

 ?>