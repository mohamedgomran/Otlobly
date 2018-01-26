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
	fetchHTTPRequest.open('GET', 'http://192.168.1.3/Otlobly/php/product_get_all.php');
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
			priceTd.textContent = arrayOfProducts[index]['price'] + 'LE.';
			parentTr.appendChild(priceTd);

			var srcTd = document.createElement('td');
			var srcDiv = document.createElement('div');
			srcDiv.setAttribute('class', 'productimgdiv');
			var srcImg = document.createElement('img');
			srcImg.setAttribute('class', 'rounded imgindiv');
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
			deleteHTTPRequest.open('POST', 'http://192.168.1.3/Otlobly/php/product_delete.php');
		    deleteHTTPRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		    console.log(targetAnc.parentNode.parentNode.id);
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
			// statements_1
			break;

		default:
			if (/[A|Una]vailable/.test(event.target.textContent)) {
				////////////////////////////////// make AJAX request ////////////////////////////////////////
				var availabilityHTTPRequest = new XMLHttpRequest();

				if (!availabilityHTTPRequest)
					alert('Giving up :( Cannot create an XMLHTTP instance');

				availabilityHTTPRequest.onreadystatechange = availabilityResponseStateCallBack;
				availabilityHTTPRequest.open('POST', 'http://192.168.1.3/Otlobly/php/product_change_availability.php');
			    availabilityHTTPRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			    console.log(targetAnc.parentNode.parentNode.id);
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