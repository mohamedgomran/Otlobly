var btnAddProduct = document.getElementById('add-product');
var allProductsContainer = document.getElementById('all-products-tbody');

var arrayOfProducts; // to store the array of products via json by the corresponding php file

////////////////////////////////// make AJAX request ///////////////////////////////////////////////////
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
			putElementsInTBody();
		} else {
			alert('There was a problem with the request.');
		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function putElementsInTBody() {
	if (arrayOfProducts.length > 0) {
		console.log('hi');
		arrayOfProducts.forEach( function(element, index) {

			console.log(index + ' : ' + element);


			var parentTr = document.createElement('tr');

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













//////////////////////////////////////////////////////////////////////////////////////////////////////
// allProductsContainer.addEventListener('click', function(event) {
// 	allProductsContainer.
// })