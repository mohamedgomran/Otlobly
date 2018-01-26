///////////////////////////////////////////////////////////////////////////////////////////////////////
//???????????????????????????????????????????????????????????????????????????????????????????????????//
//?????????????????? needs to check the identity of whoever sends these requests ????????????????????//
//???????????????????????????????????????????????????????????????????????????????????????????????????//
///////////////////////////////////////////////////////////////////////////////////////////////////////
var addUserAnc = document.getElementById('add-user');
var allUsersContainer = document.getElementById('all-users-tbody');

var arrayOfUsers; // to store the array of users via json by the corresponding php file
var deleteResponse; // response (not used currently)
var availabilityResponse; // response (not used currently)
////////////////////////////////// make AJAX request ///////////////////////////////////////////////////
var fetchHTTPRequest = new XMLHttpRequest();

function fetchUsers() {
	
	if (!fetchHTTPRequest)
		alert('Giving up :( Cannot create an XMLHTTP instance');

	fetchHTTPRequest.onreadystatechange = catchContents;
	fetchHTTPRequest.open('GET', 'http://192.168.1.3/Otlobly/php/user_get_all.php');
	fetchHTTPRequest.send();

	function catchContents() {
		if (fetchHTTPRequest.readyState === XMLHttpRequest.DONE) {
			if (fetchHTTPRequest.status === 200) { // if success
				// alert(fetchHTTPRequest.responseText);
				arrayOfUsers = JSON.parse(fetchHTTPRequest.responseText); // receive response into array
				putElementsInTBody(); // function to loop on users array and create rows
			} else {
				alert('There was a problem with the request.');
			}
		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function putElementsInTBody() {
	if (arrayOfUsers.length > 0) {

		arrayOfUsers.forEach(function(element, index) {

			var parentTr = document.createElement('tr');
			parentTr.id = arrayOfUsers[index]['UID'];

			var nameTd = document.createElement('td');
			nameTd.textContent = arrayOfUsers[index]['userName'];
			parentTr.appendChild(nameTd);

			var roomTd = document.createElement('td');
			roomTd.textContent = arrayOfUsers[index]['room'];
			parentTr.appendChild(roomTd);

			var srcTd = document.createElement('td');
			var srcDiv = document.createElement('div');
			srcDiv.setAttribute('class', 'productimgdiv');
			var srcImg = document.createElement('img');
			srcImg.setAttribute('class', 'rounded imgindiv');
			srcImg.src = arrayOfUsers[index]['picture'];
			srcTd.appendChild(srcDiv.appendChild(srcImg));
			parentTr.appendChild(srcTd);

			var extensionTd = document.createElement('td');
			extensionTd.textContent = arrayOfUsers[index]['extension'];
			parentTr.appendChild(extensionTd);

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

			allUsersContainer.appendChild(parentTr);
		});
	}
}



//////////////////////////////////////////////////////////////////////////////////////////////////////
allUsersContainer.addEventListener('click', function(event) {

	var targetAnc = event.target;

	switch (targetAnc.textContent) {
		case 'Delete':
			////////////////////////////////// make AJAX request ////////////////////////////////////////////
			var deleteHTTPRequest = new XMLHttpRequest();

			if (!deleteHTTPRequest)
				alert('Giving up :( Cannot create an XMLHTTP instance');

			deleteHTTPRequest.onreadystatechange = deleteResponseStateCallBack;
			deleteHTTPRequest.open('POST', 'http://192.168.1.3/Otlobly/php/user_delete.php');
		    deleteHTTPRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		    console.log(targetAnc.parentNode.parentNode.id);
			deleteHTTPRequest.send('userID=' + encodeURIComponent(targetAnc.parentNode.parentNode.id));

			function deleteResponseStateCallBack() {
				if (deleteHTTPRequest.readyState === XMLHttpRequest.DONE) {
					if (deleteHTTPRequest.status === 200) {
						allUsersContainer.removeChild(targetAnc.parentNode.parentNode);
					} else {
						alert('There was a problem with the request.');
					}
				}
			}
			break;
			
		case 'Edit':
			// statements_1
			break;
	}


});
//////////////////////////////////////// main  ///////////////////////////////////////////////////

fetchUsers();