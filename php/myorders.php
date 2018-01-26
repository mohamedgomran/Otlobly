<?php
    function manDb ($sql, $dataarr){
        global $conn;
        $prep = $conn->prepare($sql);
        $prep->execute($dataarr);
        return $prep;
    }

    $dsn="mysql:host=192.168.1.3;dbname=cafeteria";
    $conn= new PDO($dsn,"Otlobly","iti38");
    $query = "call my_orders(?, ?, ?)";
    $dataArr  = array(1, $_REQUEST["datefrom"], $_REQUEST["dateto"]);
    $prep = manDb($query, $dataArr);
    $result = $prep->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
?>
