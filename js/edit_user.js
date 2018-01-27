var form=document.getElementById('form');
var username=document.getElementById('name');
var nameDiv=document.getElementById('nameDiv')
var email=document.getElementById('email');
var emailDiv=document.getElementById('emailDiv');
var password=document.getElementById('password');
var passDiv=document.getElementById('passDiv');
var conf_pass=document.getElementById('confirm_password');
var conf_passDiv=document.getElementById('confirm_passwordDiv');
var room=document.getElementById('room_no');
var roomDiv=document.getElementById('roomDiv');
var ext=document.getElementById('ext');
var extDiv=document.getElementById('extDiv');
var superDiv=document.getElementById('superDiv');
var nameFlag=false;
var emailFlag=false;
var passFlag=false;
var conf_passFlag=false;
var roomFlag=false;
var extFlag=false;
var successFlag=false;


username.addEventListener("input",function() {

	if(!username.value.match(/^[a-zA-Z ]{2,30}$/))
	{
		if(nameFlag===false)
		{
			nameErr=document.createElement('p');
			nameDiv.appendChild(nameErr);
			nameErr.innerHTML="*Username must be between 2 and 30 alphabetical or white space"
			nameFlag=true
		}
	}
	else if (nameFlag)
	{
		nameDiv.removeChild(nameErr)
		nameFlag=false;
	}
});

email.addEventListener("input",function() {

	if(!email.value.match(/^[a-zA-Z][a-zA-Z0-9_.]*\@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/))
	{
		if(emailFlag===false)
		{
			emailErr=document.createElement('p');
			emailDiv.appendChild(emailErr);
			emailErr.innerHTML="*Email must be in the form aaa@aaa.aaa"
			emailFlag=true
		}
	}
	else if (emailFlag)
	{
		emailDiv.removeChild(emailErr)
		emailFlag=false;
	}
});

password.addEventListener("input",function() {

	if(!password.value.match(/^[a-zA-Z0-9_$@#!%&*^~]{8,}$/))
		{
		if(passFlag===false)
		{
			passErr=document.createElement('p');
			passDiv.appendChild(passErr);
			passErr.innerHTML="*password must be at least 8 alpha numeric characters or any of these symbols _$@#!%&*^"
			passFlag=true}
		}
	else if (passFlag)
	{
		passDiv.removeChild(passErr)
		passFlag=false;
	}
});

conf_pass.addEventListener("input",function() {

	if(password.value!==conf_pass.value)
	{
		if(conf_passFlag===false)
		{
			conf_passErr=document.createElement('p');
			conf_passDiv.appendChild(conf_passErr);
			conf_passErr.innerHTML="*password does not match"
			conf_passFlag=true
		}
	}
	else if (conf_passFlag)
	{
		conf_passDiv.removeChild(conf_passErr)
		conf_passFlag=false;
	}
});

///////////////ajax response////////////////////
function ajaxSuccess () 
{
  var response = (this.responseText)
  console.log(response)

  ////to redirect uer if he is not admin
  if(response["status"]==="go")
  	{
  		location.href=response["link"];
  	}

  else{	
  ///to remove the success message on beginning of every json request to prevent duplication
  if(successFlag==true)
	{
		successFlag==false;
		superDiv.removeChild(success)
	}

	////to view a Success message
  if (response.indexOf("success")!=-1)
  	{
  		console.log("success")
	  	success=document.createElement('h3');
		superDiv.appendChild(success);
		success.innerHTML="User was added Successfully"
		successFlag=true;
		document.getElementById("form").reset();
  	}
  else{
  	///// messages of errors according to server
	  if(response.indexOf("name")!=-1)
	  {
	  	if(nameFlag===false)
		{
			console.log("wrong name")
		  	nameErr=document.createElement('p');
			nameDiv.appendChild(nameErr);
			nameErr.innerHTML="*Username must be between 2 and 30 alphabetical or white space"
			nameFlag=true
		}
	  	
	  }	

	  if(response.indexOf("email")!=-1)
	  {
	  	if(emailFlag===false)
		{
			console.log("wrong name")
		  	emailErr=document.createElement('p');
			emailDiv.appendChild(emailErr);
			emailErr.innerHTML="*Email must be in the form aaa@aaa.aaa"
			emailFlag=true
		}
	  	
	  }

	  if(response.indexOf("email")!=-1)
	  {
	  	if(emailFlag===false)
		{
			console.log("wrong name")
		  	emailErr=document.createElement('p');
			emailDiv.appendChild(emailErr);
			emailErr.innerHTML="*Email must be in the form aaa@aaa.aaa"
			emailFlag=true
		}
	  	
	  }	

	  if(response.indexOf("email_duplication")!=-1)
	  {
	  	if(emailFlag===false)
		{
			console.log("wrong name")
		  	emailErr=document.createElement('p');
			emailDiv.appendChild(emailErr);
			emailErr.innerHTML="*This Email is already registered, try another one";
			emailFlag=true;
		}
	  	
	  }	

	  if(response.indexOf("password")!=-1)
	  {
	  	if(passFlag===false)
		{
			console.log("wrong pass")
		  	passErr=document.createElement('p');
			passDiv.appendChild(passErr);
			passErr.innerHTML="*password must be at least 8 alpha numeric characters or any of these symbols _$@#!%&*^"
			passFlag=true
		}
	  	
	  }	

	  

	  if(response.indexOf("conf_pass")!=-1)
	  {
	  	if(conf_passFlag===false)
		{
			console.log("wrong conf_pass")
		  	conf_passErr=document.createElement('p');
			conf_passDiv.appendChild(conf_passErr);
			conf_passErr.innerHTML="*password does not match"
			conf_passFlag=true
		}
	  }
	  	
	  if(response.indexOf("room")!=-1)
	  {
	  	if(roomFlag===false)
		{
			console.log("wrong room")
		  	roomErr=document.createElement('p');
			roomDiv.appendChild(roomErr);
			roomErr.innerHTML="*room must be a number"
			roomFlag=true
		}
	  	
	  }	

	  if(response.indexOf("extension")!=-1)
	  {
	  	if(roomFlag===false)
		{
			console.log("wrong room")
		  	extErr=document.createElement('p');
			extDiv.appendChild(extErr);
			extErr.innerHTML="*room must be a number"
			extFlag=true
		}
  	  }
  	}	
  }	
}
  
  

var oReq = new XMLHttpRequest();

function AJAXSubmit (oFormElement) {
  if (!oFormElement.action) { return; }
  oReq.onload = ajaxSuccess;
  if (oFormElement.method.toLowerCase() === "post") {
    oReq.open("post", oFormElement.action);
    oReq.send(new FormData(oFormElement));
  } else {
    var oField, sFieldType, nFile, sSearch = "";
    for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
      oField = oFormElement.elements[nItem];
      if (!oField.hasAttribute("name")) { continue; }
      sFieldType = oField.nodeName.toUpperCase() === "INPUT" ?
          oField.getAttribute("type").toUpperCase() : "TEXT";
      if (sFieldType === "FILE") {
        for (nFile = 0; nFile < oField.files.length;
            sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
      } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
        sSearch += "&" + escape(oField.name) + "=" + escape(oField.value);
      }
    }
    oReq.open("get", oFormElement.action.replace(/(?:\?.*)?$/, sSearch.replace(/^&/, "?")), true);
    oReq.send(null);
  }
}
/////to send ajax request on loading of page to check the user 
document.addEventListener("DOMContentLoaded", function () {
		var fetchHTTPRequest = new XMLHttpRequest();
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

  	var oReq = new XMLHttpRequest();
 	oReq.onload = ajaxSuccess;
    oReq.open("post", "../php/add_user.php");
    oReq.send();
});