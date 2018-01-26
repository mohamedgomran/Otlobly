var form=document.getElementById('form');
var username=document.getElementById('product');
// var nameDiv=document.getElementById('nameDiv')
// var email=document.getElementById('email');
// var emailDiv=document.getElementById('emailDiv')
// var password=document.getElementById('password');
// var passDiv=document.getElementById('passDiv');
// var conf_pass=document.getElementById('confirm_password');
// var conf_passDiv=document.getElementById('confirm_passwordDiv');
// var room=document.getElementById('room_no');
// var roomDiv=document.getElementById('roomDiv');
// var ext=document.getElementById('ext');
// var extDiv=document.getElementById('extDiv');
// var superDiv=document.getElementById('superDiv');
// var nameFlag=false;
// var emailFlag=false;
// var passFlag=false;
// var conf_passFlag=false;
// var roomFlag=false;
// var extFlag=false;
// var successFlag=false;



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
	  if(response.indexOf("pname")!=-1)
	  {
	  	if(nameFlag===false)
		{
			console.log("wrong name")
		  	nameErr=document.createElement('p');
			nameDiv.appendChild(nameErr);
			nameErr.innerHTML="*Product name name must be between 2 and 30 alphabetical or white space"
			nameFlag=true
		}
	  	
	  }	

	  if(response.indexOf("price")!=-1)
	  {
	  	if(priceFlag===false)
		{
			console.log("wrong price")
		  	priceErr=document.createElement('p');
			priceDiv.appendChild(priceErr);
			priceErr.innerHTML="*Each product must have price"
			priceFlag=true
		}
	  	
	  }
	  	

	  if(response.indexOf("category")!=-1)
	  {
	  	if(roomFlag===false)
		{
			console.log("wrong category")
		  	categoryErr=document.createElement('p');
			categoryDiv.appendChild(categoryErr);
			categoryErr.innerHTML="*Category is missing";
			categoryFlag=true;
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
  	var oReq = new XMLHttpRequest();
 	oReq.onload = ajaxSuccess;
    oReq.open("post", "../php/add_product.php");
    oReq.send();
})