var btnAddProduct = document.getElementById('add-product');
var allProductsContainer = document.getElementById('all-products-tbody');

var arrayOfProducts; // to store the array of products via json by the corresponding php file
var deleteResponse;
////////////////////////////////// make AJAX request ///////////////////////////////////////////////////
var fetchHTTPRequest = new XMLHttpRequest();

function fetchProducts() {
	
	if (!fetchHTTPRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
	}

	fetchHTTPRequest.onreadystatechange = catchContents;
	fetchHTTPRequest.open('GET', 'http://192.168.1.3/Otlobly/php/all_products.php');
	fetchHTTPRequest.send();

	function catchContents() {
		if (fetchHTTPRequest.readyState === XMLHttpRequest.DONE) {
			if (fetchHTTPRequest.status === 200) {
				// alert(fetchHTTPRequest.responseText);
				arrayOfProducts = JSON.parse(fetchHTTPRequest.responseText);
				putElementsInTBody();
			} else {
				alert('There was a problem with the request.');
			}
		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function putElementsInTBody() {
	if (arrayOfProducts.length > 0) {

		arrayOfProducts.forEach(function(element, index) {

			console.log(element + ' ' + index);

			var parentTr = document.createElement('tr');
			parentTr.id = arrayOfProducts[index]['PID'];

			var lableTd = document.createElement('td');
			lableTd.class = 'test', lableTd.textContent = arrayOfProducts[index]['pname'];
			parentTr.appendChild(lableTd);

			var priceTd = document.createElement('td');
			priceTd.textContent = arrayOfProducts[index]['price'] + 'LE.';
			parentTr.appendChild(priceTd);

			var srcTd = document.createElement('td');
			var srcDiv = document.createElement('div');
			srcDiv.class = 'productimgdiv';
			var srcImg = document.createElement('img');
			srcImg.class = 'rounded imgindiv';
			srcImg.src = arrayOfProducts[index]['picture'];
			srcTd.appendChild(srcDiv.appendChild(srcImg));
			parentTr.appendChild(srcTd);

			var availTd = document.createElement('td');
			var availAnc = document.createElement('a');
			availAnc.href = '#';
			if (arrayOfProducts[index]['availability'] == 1)
				availAnc.textContent = 'Available';
			else
				availAnc.textContent = 'Unavailable';
			availTd.appendChild(availAnc);
			parentTr.appendChild(availTd);

			var edit_delTd = document.createElement('td');
			var editAnc = document.createElement('a');
			editAnc.href = '#', editAnc.textContent = 'Edit';
			var slashSpan = document.createElement('span');
			slashSpan.textContent = ' / ';
			var delAnc = document.createElement('a');
			delAnc.href = '#', delAnc.textContent = 'Delete';
			edit_delTd.appendChild(editAnc);
			edit_delTd.appendChild(slashSpan);
			edit_delTd.appendChild(delAnc);
			parentTr.appendChild(edit_delTd);

			allProductsContainer.appendChild(parentTr);
		});
	}
}

// function removeProduct() {
// 	var tempCollection = allProductsContainer.getElementsByTagName('tr');
// 	tempCollection.forEach(function(element) {
// 		allProductsContainer.removeChild(element);
// 	});
// }




//////////////////////////////////////////////////////////////////////////////////////////////////////
allProductsContainer.addEventListener('click', function(event) {

	if (event.target.textContent == 'Delete') {
		
		var ancDel = event.target;

		////////////////////////////////// make AJAX request ///////////////////////////////////////////////////
		var deleteHTTPRequest = new XMLHttpRequest();

		if (!deleteHTTPRequest) {
			alert('Giving up :( Cannot create an XMLHTTP instance');
		}

		deleteHTTPRequest.onreadystatechange = deleteResponseStateCallBack;
		deleteHTTPRequest.open('POST', 'http://192.168.1.3/Otlobly/php/delete_product.php');
	    deleteHTTPRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    console.log(ancDel.parentNode.parentNode.id);
		deleteHTTPRequest.send('productID=' + encodeURIComponent(ancDel.parentNode.parentNode.id));

		function deleteResponseStateCallBack() {
			if (deleteHTTPRequest.readyState === XMLHttpRequest.DONE) {
				if (deleteHTTPRequest.status === 200) {
					// alert(deleteHTTPRequest.responseText);
					// deleteResponse = JSON.parse(deleteHTTPRequest.responseText);
					allProductsContainer.removeChild(ancDel.parentNode.parentNode);
				} else {
					alert('There was a problem with the request.');
				}
			}
		}
		// send the request to php file to delete the file
		
	} else if (event.target.textContent == 'Edit') {
		var ancEdit = event.target;

	}
})
//////////////////////////////////////// main  ///////////////////////////////////////////////////

fetchProducts();