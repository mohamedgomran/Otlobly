<?php
    session_start();
    
    include_once "../classes/class_order.php";
    include_once "../classes/class_user.php";

    $userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
  
    if ($userId) {
		if (user::isAdmin($userId)) {
            echo json_encode(array('rstatus'=>'go', 'link'=>'admin_home.html'));
    		exit;
		}
    }
    
	else{
		echo json_encode(array('rstatus'=>'login'));
		exit;
    }
    
    $success = true;

    try {
        Order::cancelOrder($_REQUEST["id"]);
    } catch (Exception $e) {
        $success = false;
    }

    echo json_encode($success);
?>