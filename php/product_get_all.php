<?php
	// print_r($_REQUEST);
	include_once('../classes/class_products.php');

	echo json_encode(Product::get_available_products());

	// print_r(Product::get_available_products());

?>