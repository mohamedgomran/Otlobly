// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         console.log(this.responseText);
//     }
// };
// xmlhttp.open("POST", "../php/login.php");
// xmlhttp.send();


function ajaxSuccess () {

	var response = JSON.parse(this.responseText)
	if (response['status']=="error") {
		var errorDiv = document.getElementById('error')
		if (errorDiv.style.display=='block') {return}
		errorDiv.style.display = 'block'
		var newP = document.createElement('p')
		newP.innerHTML = response['msg']
		errorDiv.appendChild(newP)
	}
	else if (response['status']=="go") {
		location.href = response['link']
	}
	else if (response['status']=="login") {
		document.getElementById('formcontainer').style.display = 'block'
	}
  console.log(response);
}



function AJAXSubmit (oFormElement) {
  if (!oFormElement.action) { return; }
  var oReq = new XMLHttpRequest();
  oReq.onload = ajaxSuccess;
  if (oFormElement.method.toLowerCase() === "post") {
    oReq.open("post", oFormElement.action);
    oReq.send(new FormData(oFormElement));
  } 
}

 document.addEventListener("DOMContentLoaded", function () {
  	var oReq = new XMLHttpRequest();
 		oReq.onload = ajaxSuccess;
    	oReq.open("post", "../php/login.php");
    	oReq.send();
});

