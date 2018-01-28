<?php

    include_once "../classes/class_order.php";

    $query = "insert into categories values(null, ?)";
    $dataArr  = array($_POST["category"]);
    
    $success = true;

    try {
        Order::manDb($query, $dataArr);
    } catch (Exception $e) {
        $success = false;
    }
    
    if($success) {
        header("Location: ../pages/add_product.html");
    } else {
        header("Location: ../pages/add_category.html");
    }
?>
