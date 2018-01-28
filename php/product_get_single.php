<?php

	include_once('../classes/class_products.php');
	require_once ('../classes/dbase.php');

	echo json_encode(Product::get_product_by_id($_POST['PID']));

?>