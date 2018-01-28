///////////////////////////////////////////////////////////////////////////////////////////////////////
//???????????????????????????????????????????????????????????????????????????????????????????????????//
//?????????????????? needs to check the identity of whoever sends these requests ????????????????????//
//???????????????????????????????????????????????????????????????????????????????????????????????????//
///////////////////////////////////////////////////////////////////////////////////////////////////////
var btnAddProduct = document.getElementById('add-product');
var allProductsContainer = document.getElementById('all-products-tbody');

var arrayOfProducts; // to store the array of products via json by the corresponding php file
var deleteResponse; // response (not used currently)
var availabilityResponse; // response (not used currently)
////////////////////////////////// make AJAX request ///////////////////////////////////////////////////
var fetchHTTPRequest = new XMLHttpRequest();

function fetchProducts() {
	
	if (!fetchHTTPRequest)
		alert('Giving up :( Cannot create an XMLHTTP instance');

	fetchHTTPRequest.onreadystatechange = catchContents;
	fetchHTTPRequest.open('GET', '../php/product_get_all.php');
	fetchHTTPRequest.send();

	function catchContents() {
		if (fetchHTTPRequest.readyState === XMLHttpRequest.DONE) {
			if (fetchHTTPRequest.status === 200) { // if success
				// alert(fetchHTTPRequest.responseText);
				arrayOfProducts = JSON.parse(fetchHTTPRequest.responseText); // receive response into array
				putElementsInTBody(); // function to loop on products array and create rows
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

			var parentTr = document.createElement('tr');
			parentTr.id = arrayOfProducts[index]['PID'];

			var lableTd = document.createElement('td');
			lableTd.setAttribute('class', 'test'), lableTd.textContent = arrayOfProducts[index]['pname'];
			parentTr.appendChild(lableTd);

			var priceTd = document.createElement('td');
			priceTd.textContent = arrayOfProducts[index]['price'] + ' LE.';
			parentTr.appendChild(priceTd);

			var srcTd = document.createElement('td');
			var srcDiv = document.createElement('div');
			srcDiv.setAttribute('class', 'productimgdiv');
			var srcImg = document.createElement('img');
			srcImg.setAttribute('class', 'rounded imgindiv');
			srcImg.src = "../img/product/"+arrayOfProducts[index]['PID']+".jpg";
			srcDiv.appendChild(srcImg);
			srcTd.appendChild(srcDiv);
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



//////////////////////////////////////////////////////////////////////////////////////////////////////
allProductsContainer.addEventListener('click', function(event) {

	var targetAnc = event.target;

	switch (targetAnc.textContent) {
		case 'Delete':
			////////////////////////////////// make AJAX request ////////////////////////////////////////////
			var deleteHTTPRequest = new XMLHttpRequest();

			if (!deleteHTTPRequest)
				alert('Giving up :( Cannot create an XMLHTTP instance');

			deleteHTTPRequest.onreadystatechange = deleteResponseStateCallBack;
			deleteHTTPRequest.open('POST', '../php/product_delete.php');
		    deleteHTTPRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			deleteHTTPRequest.send('productID=' + encodeURIComponent(targetAnc.parentNode.parentNode.id));

			function deleteResponseStateCallBack() {
				if (deleteHTTPRequest.readyState === XMLHttpRequest.DONE) {
					if (deleteHTTPRequest.status === 200) {
						allProductsContainer.removeChild(targetAnc.parentNode.parentNode);
					} else {
						alert('There was a problem with the request.');
					}
				}
			}
			break;
			
		case 'Edit':
			window.location.href = "edit_product.html?PID=" + targetAnc.parentNode.parentNode.id;
			break;

		default:
			if (/^(A|Una)vailable$/.test(targetAnc.textContent) && targetAnc.tagName == 'A') {
				////////////////////////////////// make AJAX request ////////////////////////////////////////
				var availabilityHTTPRequest = new XMLHttpRequest();

				if (!availabilityHTTPRequest)
					alert('Giving up :( Cannot create an XMLHTTP instance');

				availabilityHTTPRequest.onreadystatechange = availabilityResponseStateCallBack;
				availabilityHTTPRequest.open('POST', '../php/product_change_availability.php');
			    availabilityHTTPRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				availabilityHTTPRequest.send('productID=' + encodeURIComponent(targetAnc.parentNode.parentNode.id));

				function availabilityResponseStateCallBack() {
					if (availabilityHTTPRequest.readyState === XMLHttpRequest.DONE) {
						if (availabilityHTTPRequest.status === 200) {
							targetAnc.textContent = targetAnc.textContent == 'Available' ? 'Unavailable' : 'Available';
						} else {
							alert('There was a problem with the request.');
						}
					}
				}
			}
			break;
	}


});
//////////////////////////////////////// main  ///////////////////////////////////////////////////

fetchProducts();