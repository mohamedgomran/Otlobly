<?php 
	session_start();
	include_once '../classes/class_user.php';

	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	$userEmailInput = !empty($_POST['email']) ? $_POST['email'] : "";
	$passwordInput = !empty($_POST['password']) ? sha1($_POST['password']) : "";

	if ($userId) {
		if (user::isAdmin($userId)) {
			echo json_encode(array('status'=>'go', 'link'=>'admin_home.html'));
		}
		else {
			echo json_encode(array('status'=>'go', 'link'=>'user_home.html'));
		}
		exit;
	}
	elseif (!$userEmailInput&&!$passwordInput){
		echo json_encode(array('status'=>'login'));
		exit;

	}




	$result = user::getSingleUser($userEmailInput);
	$result = $result ? $result : "";
	$userPass = $result ? $result['password'] : "";
	$userEmail = $result ? $result['email'] : "";

	if ($userPass==$passwordInput && !empty($passwordInput)) {
		$_SESSION['userId'] = trim($result['UID']);
		
		if (user::isAdmin($result['UID'])) {
			echo json_encode(array('status'=>'go', 'link'=>'admin_home.html'));
		}
		else{
			echo json_encode(array('status'=>'go', 'link'=>'user_home.html'));
		}

		exit;
	}
	elseif(empty($password)||empty($user_name)){
		echo json_encode(array('status'=>'error', 'msg'=>'Login info is not correct'));
	}
	else{
		echo json_encode(array('status'=>'error', 'msg'=>'Login info is not correct'));
	}

?>