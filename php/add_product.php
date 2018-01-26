<?php

	session_start();
	require_once '../classes/dbase.php';
	require_once '../classes/class_products.php';
	include_once '../classes/class_user.php';
	require_once './uploadimg.php';
	include_once '/classes/class_category.php';
	

	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	if ($userId) {
		if (user::isAdmin($userId)) 
		{
			$pname=!empty($_POST['pname'])?$_POST['pname']:"";
			$price=!empty($_POST['price'])?$_POST['price']:"";
			$category=!empty($_POST['category'])?$_POST['category']:"";

			$path = '../img/product/';
			$picture=!empty($_FILES['picture']['tmp_name'])?$_FILES['picture']['tmp_name']:"";
			$img_info = getimagesize($picture)?getimagesize($picture):"";

			$cateArr=category::getCategory();
			$catNo=count($cateArr);
			$errors=[];

			if (!preg_match('/^[a-zA-Z ]{2,30}$/',$pname))
				{
					array_push($errors, "pname");
				}

			if (!preg_match('/\S+@\S+\.\S+/',$price))
			{
					array_push($errors, "price");
			}

			if ($category>$catNo)
			{
					array_push($errors, "category");
			}

			if (!$img_info&&!$picture)
			{
				array_push($errors, "picture");
			}
			
			$searchArray=Product::get_product($pname);
			if(!empty($searchArray))
			{
				array_push($errors,"pname_duplication");
			}

		////check if any errors exist to reply back
			if($errors)
			{
				echo json_encode(array('status'=>'error','errors'=>$errors));
			}
		//// if no errors then send data to database
			else
			{

				$newProduct= new Product($pname, $category, $price, $picture,1);
				$newProduct->add();
				$productId = Product::get_product($pname)['PID'];
				$success=["success", $productId];
				echo json_encode($success);
				if ($img_info) {
					uploadimg($picture, $img_info, $path, $productId);
				}
				
			}
		}
		else 
		{
			echo json_encode(array('status'=>'go', 'link'=>'login.html'));
		}
	}

 ?>