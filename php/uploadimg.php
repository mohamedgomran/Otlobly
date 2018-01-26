<?php 

	function uploadimg($picture, $img_info, $path, $userId){

		$width = $img_info[0];
		$height = $img_info[1];
		switch ($img_info[2]) {
	  		case IMAGETYPE_GIF  : $src = imagecreatefromgif($picture);  break;
	  		case IMAGETYPE_JPEG : $src = imagecreatefromjpeg($picture); break;
	  		case IMAGETYPE_PNG  : $src = imagecreatefrompng($picture);  break;
	  		case IMAGETYPE_JPG  : $src = imagecreatefromjpeg($picture);  break;
	  		case IMAGETYPE_BMP  : $src = imagecreatefrombmp($picture);  break;
		default : die("Unknown filetype");
		}
	
		$tmp = imagecreatetruecolor(200, 200);
		imagecopyresampled($tmp, $src, 0, 0, 0, 0, 200, 200, $width, $height);
		$dst = $path . $userId . ".jpg";
		imagejpeg($tmp, $dst, 100);
	}



 ?>