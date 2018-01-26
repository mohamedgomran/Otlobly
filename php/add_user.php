<?php

	session_start();
	require_once '../classes/dbase.php';
	require_once '../classes/class_user.php';
	require_once './uploadimg.php';
	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	if ($userId) {
		if (user::isAdmin($userId)) 
		{

			// echo json_encode(array('status'=>'admin');
			$name=!empty($_POST['name'])?$_POST['name']:"";
			$email=!empty($_POST['email'])?$_POST['email']:"";
			$password=!empty($_POST['password'])?$_POST['password']:"";
			$duplPassword=!empty($_POST['confirm_password'])?$_POST['confirm_password']:"";
			$room=!empty($_POST['room_no'])?$_POST['room_no']:"";
			$extension=!empty($_POST['ext'])?$_POST['ext']:"";
	
			$path = '../img/user/';
			$picture=!empty($_FILES['picture']['tmp_name'])?$_FILES['picture']['tmp_name']:"";
			$img_info = getimagesize($picture)?getimagesize($picture):"";

			$admin=0;
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
			{	
				array_push($errors, "room"); 
			}
				

			if (!preg_match('/^[0-9]+$/',$extension) && $extension!=null)
			{
					array_push($errors, "extension");
			}

			if (!$img_info&&!$picture)
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
		//// if no errors then send data to database
			else
			{

				$newUser= new user($name,$email,sha1($password),$room,$admin,$picture,$extension);
				$newUser->addUser();
				$userId = user::getSingleUser($email)['UID'];
				$success=["success", $userId];
				echo json_encode($success);
				if ($img_info) {
					uploadimg($picture, $img_info, $path, $userId);
				}
				
			}
		}
		else 
		{
			echo json_encode(array('status'=>'go', 'link'=>'login.html'));
		}
	}

 ?>