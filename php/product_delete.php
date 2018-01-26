 <?php
 	include_once '../classes/class_products.php';

 	// $id_of_product_to_be_deleted = $_GET['id'];

 	// needs to check for the identity of the sender

 	Product::remove($_POST['productID']);

 	json_encode(Product::get_available_products());

 ?>