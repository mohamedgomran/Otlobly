<?php 
	include_once '../classes/class_products.php';

	// needs to check for the identity of the sender

	$availability_value = Product::get_availability($_POST['productID'])['availability'];

	Product::set_availability($_POST['productID'], $availability_value == 1 ? 0 : 1 );
	
	// json_encode(Product::get_available_products());

?>