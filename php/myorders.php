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

    $query = "call my_orders(?, ?, ?)";
    $dataArr  = array($userId, $_REQUEST["datefrom"], $_REQUEST["dateto"]);
    $prep = Order::manDb($query, $dataArr);
    $result = $prep->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
?>
