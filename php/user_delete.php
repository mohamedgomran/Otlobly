 <?php
 	include_once('../classes/class_user.php');

 	// $id_of_product_to_be_deleted = $_GET['id'];

 	// needs to check for the identity of the sender


 	$_POST['userID'] = 2;
 	// echo $_POST['userID'];

 	user::removeUser($_POST['userID']);

 	// json_encode(Product::get_available_products());

 ?>