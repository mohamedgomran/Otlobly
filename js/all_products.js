var btnAddProduct = document.getElementById('add-product');

var arrayOfProducts;

var httpRequest = new XMLHttpRequest();

if (!httpRequest) {
	alert('Giving up :( Cannot create an XMLHTTP instance');
}

httpRequest.onreadystatechange = catchContents;
httpRequest.open('GET', 'http://192.168.1.3/Otlobly/php/all_products.php');
httpRequest.send();

function catchContents() {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			// alert(httpRequest.responseText);
			arrayOfProducts = JSON.parse(httpRequest.responseText);
		} else {
			alert('There was a problem with the request.');
		}
	}
}

