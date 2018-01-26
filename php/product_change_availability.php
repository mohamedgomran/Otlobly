<?php 
	include_once '../classes/class_products.php';

	// $id_of_product_to_be_deleted = $_GET['id'];

	// needs to check for the identity of the sender
	$_POST['productID'] = 1;

	// $availability_db_value = Product::get_field($_POST['productID'], 'availability');
	print_r (Product::get_field($_POST['productID'], 1));
	// echo (Product::get_field($_POST['productID'], 'availability')[0]['availability']);
	// Product::set_field($_POST['productID'], 'availability', $availability_db_value == 1 ? 0 : 1);

	// json_encode(Product::get_available_products());



?>