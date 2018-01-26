

function ajaxSuccess () {

	var response = JSON.parse(this.responseText)
  	console.log(response);
	if (response['rstatus']=="error") {
		// var errorDiv = document.getElementById('error')
		// if (errorDiv.style.display=='block') {return}
		// errorDiv.style.display = 'block'
		// var newP = document.createElement('p')
		// newP.innerHTML = response['msg']
		// errorDiv.appendChild(newP)
	}

	else if (response['rstatus']=="login") {
		location.href = '../pages/login.html'
	}
}



// function AJAXSubmit (oFormElement) {
//   if (!oFormElement.action) { return; }
//   var oReq = new XMLHttpRequest();
//   oReq.onload = ajaxSuccess;
//   if (oFormElement.method.toLowerCase() === "post") {
//     oReq.open("post", oFormElement.action);
//     oReq.send(new FormData(oFormElement));
//   } 
// }

 document.addEventListener("DOMContentLoaded", function () {
  	var oReq = new XMLHttpRequest();
 		oReq.onload = ajaxSuccess;
    	oReq.open("post", "../php/user_home.php");
    	oReq.send();
});

