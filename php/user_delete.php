 <?php
 	include_once '../classes/class_user.php';

 	// $id_of_product_to_be_deleted = $_GET['id'];

 	// needs to check for the identity of the sender

 	user::removeUser($_POST['userID']);

 	// json_encode(Product::get_available_products());

 ?>