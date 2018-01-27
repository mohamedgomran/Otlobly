<?php
    include_once "../classes/class_order.php";
    
    $query = "call checks(?, ?)";
    $dataArr  = array($_REQUEST["datefrom"], $_REQUEST["dateto"]);
    $prep = Order::manDb($query, $dataArr);
    $result = $prep->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
?>