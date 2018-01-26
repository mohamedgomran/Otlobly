<?php
	require_once '../classes/dbase.php';
	require_once '../classes/class_category.php';

	$cateArr=category::getCategory();
	echo json_encode(array('place'=>'category','rows'=>$cateArr));
					
	exit;
 ?>