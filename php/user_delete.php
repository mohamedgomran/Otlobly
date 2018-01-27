<?php
	// needs to check for the identity of the sender
	include_once('../classes/class_user.php');
	
	user::removeUser($_POST['userID']);
	json_encode($_POST['userID']);

?>