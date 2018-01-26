

function ajaxSuccess () {

	var response = JSON.parse(this.responseText)
  	console.log(response);
	if (response['rstatus']=="error") {
	}
	else if (response['rstatus']=="login") {
		location.href = '../pages/login.html'
	}
	else if (response['rstatus']=="logged") {
	}
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
    	oReq.open("post", "../php/user_home.php");
    	oReq.send();
});

