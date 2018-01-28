<?php

    include_once "../classes/class_category.php";

    
    $success = true;

    $query = "select cname from categories where cname = ?";
    $dataArr  = array($_REQUEST["category"]);
    $prep = category::manDb($query, $dataArr);
    $result = $prep->fetchAll(PDO::FETCH_ASSOC);

    if (empty($result)) {
        $query1 = "insert into categories values(null, ?)";
        $dataArr1  = array($_REQUEST["category"]);
        category::manDb($query1, $dataArr1);
        $success = true;
    } else {
        $success = false;
    }
    
    echo json_encode($success);
?>
