<?php
	include_once('../classes/class_user.php');

	function upload($picture, $img_info, $path, $userId){

		$width = $img_info[0];
		$height = $img_info[1];
		switch ($img_info[2]) {
	  		case IMAGETYPE_GIF  : $src = imagecreatefromgif($picture);  break;
	  		case IMAGETYPE_JPEG : $src = imagecreatefromjpeg($picture); break;
	  		case IMAGETYPE_PNG  : $src = imagecreatefrompng($picture);  break;
	  		case IMAGETYPE_JPG  : $src = imagecreatefromjpeg($picture);  break;
	  		case IMAGETYPE_BMP  : $src = imagecreatefrombmp($picture);  break;
		default : die("Unknown filetype");
		}
	
		$tmp = imagecreatetruecolor(200, 200);
		imagecopyresampled($tmp, $src, 0, 0, 0, 0, 200, 200, $width, $height);
		$dst = $path . $userId . ".jpg";
		imagejpeg($tmp, $dst, 100);
	}

	$newUser;
	session_start();
	require_once '../classes/dbase.php';
	require_once '../classes/class_user.php';
	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	if ($userId) {
		if (user::isAdmin($userId)) 
		{

			echo json_encode(array('status'=>'admin'));
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

			if ($password !== '') {
				if (!preg_match('/^[a-zA-Z0-9_$@#!%&*^~]{8,}$/',$password) || $password!==$duplPassword)
				{
						array_push($errors, "password");
				}
			}

			if (!preg_match('/^[0-9]+$/',$room) && $room!=null)
			{	
				array_push($errors, "room"); 
			}
				

			if (!preg_match('/^[0-9]+$/',$extension) && $extension!=null)
			{
					array_push($errors, "extension");
			}

			// if (!$img_info&&!$picture)
			// {
			// 	array_push($errors, "picture");
			// }
			
			$searchArray=user::getSingleUser($email);
			if(!empty($searchArray) && $searchArray['UID'] !== $_POST['uId'])
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

				if ($password == "") {
					$newUser= new user($name,$email,NULL,$room,$admin,$picture,$extension);
					$newUser->editUserWithoutPassword($_POST['uId']);
					echo json_encode($_POST['uId']);
				} else {
					$newUser= new user($name,$email,sha1($password),$room,$admin,$picture,$extension);
					$newUser->editUser($_POST['uId']);
					echo json_encode($_POST['uId']);
				}
				$userId = user::getSingleUser($email)['UID'];
				$success=["success", $userId];
				echo json_encode($success);
				if ($img_info) {
					upload($picture, $img_info, $path, $userId);
					
				}
				
			}
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