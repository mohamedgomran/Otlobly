<?php

    include_once "../classes/class_order.php";

    $query = "call home_orders()";
    $dataArr  = array();
    $prep = Order::manDb($query, $dataArr);
    $result = $prep->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);

?>