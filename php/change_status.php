<?php
    
    include_once "../classes/class_order.php";

    $query0 = "SET GLOBAL event_scheduler = ON";
    $dataArr0 = array();

    $query1 = "update orders set status=? where OID=?";
    $dataArr1  = array("out for delivery", $_REQUEST["id"]);

    $unique_id = uniqid('a');

    $query2 = "CREATE EVENT ${unique_id} ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 10 MINUTE DO UPDATE `orders` SET status = ? WHERE OID = ?";
    $dataArr2  = array("done", $_REQUEST["id"]);
    
    $success = true;

    try {
        Order::manDb($query0, $dataArr0);
        Order::manDb($query1, $dataArr1);
        Order::manDb($query2, $dataArr2);
    } catch (Exception $e) {
        $success = false;
    }

    echo json_encode($success);
?>
