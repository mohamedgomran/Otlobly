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
			$PID=!empty($_POST['PID'])?$_POST['PID']:"";
			$pname=!empty($_POST['product'])?$_POST['product']:"";
			$price=!empty($_POST['price'])?$_POST['price']:"";
			$category=!empty($_POST['category'])?$_POST['category']:"";
			$path = '../img/product/';
			$picture=!empty($_FILES['picture']['tmp_name'])?$_FILES['picture']['tmp_name']:"";
			if($picture) {
				$img_info = getimagesize($picture)?getimagesize($picture):"";
			} else {$img_info=null;}
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
			
			$searchArray=Product::get_product($pname);

			if(!empty($searchArray) && $searchArray['PID'] !== $PID)
			{
				array_push($errors,"pname_duplication");
			}


			// if(count($searchArray) > 6)
			// {
			// 	array_push($errors,"pname_duplication");
			// 	array_push($errors, count($searchArray));
			// }

		////check if any errors exist to reply back
			if($errors)
			{
				echo json_encode(array('status'=>'error','errors'=>$errors));
			}
		//// if no errors then send data to database
			else
			{
				// $catId = category::getOneCategory($category)['CID'];
				// $newProduct= new Product('a', $catId, 3, NULL, 1);
				$newProduct= new Product($pname, $category, $price, $picture, 1);
				echo print_r($newProduct);
				$newProduct->edit($PID);
				// $productId = Product::get_product_by_id($PID)['PID'];
				echo json_encode(array('status'=>'success'));
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

	else 
	{
		echo json_encode(array('status'=>'go', 'link'=>'login.html'));
	}

?>
