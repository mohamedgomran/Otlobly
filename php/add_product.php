<?php

	session_start();
	require_once '../classes/dbase.php';
	require_once '../classes/class_products.php';
	include_once '../classes/class_user.php';
	include_once '../classes/class_category.php';
	include_once 'uploadimg.php';
	$userId = !empty($_SESSION['userId']) ? $_SESSION['userId'] : "";
	if ($userId) 
	{
		if (user::isAdmin($userId)) 
		{	
			$pname=!empty($_POST['product'])?$_POST['product']:"";
			$price=!empty($_POST['price'])?$_POST['price']:"";
			$category=!empty($_POST['category'])?$_POST['category']:"";
			$path = '../img/product/';
			$picture=!empty($_FILES['picture']['tmp_name'])?$_FILES['picture']['tmp_name']:"";
			if($picture){
			$img_info = getimagesize($picture)?getimagesize($picture):"";}
			else{$img_info=null;}
			$cateArr=category::getCategory();
			$catNo=count($cateArr);
			$errors=[];

			if (!preg_match('/^[a-zA-Z ]{2,30}$/',$pname))
			{
				array_push($errors, "pname");
			}

			if (!is_numeric($price))
			{
				array_push($errors, "price");
			}

			if ($category>$catNo || $category==null)
			{
				array_push($errors, "category");
			}

			if (!$img_info)
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
				echo json_encode(array('status'=>'success'));
				if ($img_info) {
					uploadimg($picture, $img_info, $path, $productId);
				}
				exit;
			}
		}
		else 
		{
			echo json_encode(array('status'=>'go', 'link'=>'login.html'));
		}
	}

	else 
	{
		echo json_encode(array('status'=>'go', 'link'=>'login.html'));
	}

 ?>