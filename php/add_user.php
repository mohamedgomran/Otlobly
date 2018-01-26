<?php
	session_start();
	require_once '../classes/dbase.php';
	require_once '../classes/class_user.php';

	$name=!empty($_POST['name'])?$_POST['name']:"";
	$email=!empty($_POST['email'])?$_POST['email']:"";
	$password=!empty($_POST['password'])?$_POST['password']:"";
	$duplPassword=!empty($_POST['confirm_password'])?$_POST['confirm_password']:"";
	$room=!empty($_POST['room_no'])?$_POST['room_no']:"";
	$extension=!empty($_POST['ext'])?$_POST['ext']:"";
	$picture=!empty($_POST['picture'])?$_POST['picture']:"";
	// $admin=flase;
	$errors=[];

	if (!preg_match('/^[a-zA-Z ]{2,30}$/',$name))
		{
			array_push($errors, "name");
		}

	if (!preg_match('/\S+@\S+\.\S+/',$email))
	{
			array_push($errors, "name");
	}

	if (!preg_match('/^[a-zA-Z0-9_$@#!%&*^~]{8,}$/',$password) || $password!==$duplPassword)
	{
			array_push($errors, "password");
	}

	if (!preg_match('/^[0-9]+$/',$room) && $room!=null)
	{	array_push($errors, "room"); }
		

	if (!preg_match('/^[0-9]+$/',$extension) && $extension!=null)
	{
			array_push($errors, "extension");
	}

	if (!preg_match('/^\S+\.(jpg|JPG|png|PNG)/',$picture) && $picture!=null)
	{
			array_push($errors, "picture");
	}
	
	$searchArray=user::getSingleUser($email);
	if(!empty($searchArray))
	{
		array_push($errors,"email_duplication");
	}
////check if any errors exist to reply back
	if($errors)
	{
		echo json_encode($errors);
	}
//// f no errors then send data to database
	else
	{
		$path = '../img/user/';
		$img = $_FILES['picture']['tmp_name'];
		$dst = $path . $_FILES['picture']['name'];
		
		if (($img_info = getimagesize($img)) === FALSE)
		  die("Image not found or not an image");

		if ($_FILES['file']['name']) {
			$extension = end(explode(".", $_FILES['file']['name']));
			// $extension = end($extension);
			$UpFile = '../img/user/'.$user_name.".".$extension;
			echo $UpFile;
		}

		if (is_uploaded_file($_FILES['file']['tmp_name'])){

			if (!move_uploaded_file($_FILES['file']['tmp_name'], $UpFile)){
				echo "Problem: Could not move file to destination directory";
			}
		}

		$newUser= new user($name,$email,sha1($password),$room,$admin,$picture,$extension);
		$newUser->addUser();
		echo json_encode(["success"]);
	}
	
	

 ?>