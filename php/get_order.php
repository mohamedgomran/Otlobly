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

    $query = "call order_expand(?)";
    $dataArr  = array($_REQUEST["id"]);
    $prep = Order::manDb($query, $dataArr);
    $result = $prep->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);

    //echo json_encode("this is your id : ${_REQUEST["id"]}");
?>