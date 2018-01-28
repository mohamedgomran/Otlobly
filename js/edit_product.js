///////////////////////////////////////////////////////////////////////////////////////////////////////////
var productInfo;

var mainDiv=document.getElementById('mainDiv')
var form=document.getElementById('form');
var pname=document.getElementById('product');
var formSelect=document.getElementById('select');
var pnameDiv=document.getElementById('nameDiv')
var priceDiv=document.getElementById('priceDiv');
var categoryDiv=document.getElementById('categoryDiv')
var pictureDiv=document.getElementById('pictureDiv')
var price=document.getElementById('price');

var pnameFlag=false;
var priceFlag=false;
var categoryFlag=false;
var pictureFlag=false
var successFlag=false;


function getQueryParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


pname.addEventListener("input",function() {

	if (pnameFlag)
	{
		pnameDiv.removeChild(pnameErr)
		pnameFlag=false;
	}
});

price.addEventListener("input",function() {

	if (priceFlag)
	{
		priceDiv.removeChild(priceErr)
		priceFlag=false;
	}
});
formSelect.addEventListener("input",function() {

	if (categoryFlag)
	{
		categoryDiv.removeChild(categoryErr)
		categoryFlag=false;
	}
});
function categoryMan(row)
{
	let cname=row['cname'];
	let CID=row['CID'];
	let option=document.createElement('option');
	if (cname === productInfo['cname']) {
		option.selected = 'selected;'
	}
	formSelect.appendChild(option);
	option.innerHTML=cname;
	option.value=CID;
}
///////////////ajax response////////////////////
function ajaxSuccess ()
{
  var response =JSON.parse(this.responseText)
  console.log(response);
  if (response["admin"]=="true")
  	{
  		mainDiv.style.display='block';
  	}
   if (response['admin']=="false")
  	{
  	location.href="login.html";
  	}
  
  else{
		if (response["place"]=="category")
	  	{
	  		var rows=response["rows"]

	  		var selectedCat = productInfo['cname'];
	  		formSelect.getElementsByTagName('option')

	  		for (var i = 0; i < rows.length; i++) 
	  		{
	  			categoryMan(rows[i]);
	  		}
	  	}
	}

  ///to remove the success message on beginning of every json request to prevent duplication
  if(successFlag==true)
	{
		successFlag=false;
		form.removeChild(success)
	}
	if (response['status']=='error') 
  	{
  	  // console.log("errors found")
  	  errorsArr=response['errors']
	  if(errorsArr.indexOf("pname")!=-1)
	  {
	  	if(pnameFlag===false)
		{
			// console.log("wrong name")
		  	pnameErr=document.createElement('p');
			pnameDiv.appendChild(pnameErr);
			pnameErr.innerHTML="*Product name must be between 2 and 30 alphabetical or white space"
			pnameFlag=true
		}
	  	
	  }	

	  if(errorsArr.indexOf("price")!=-1)
	  {
	  	if(priceFlag===false)
		{
			// console.log("wrong price")
		  	priceErr=document.createElement('p');
			priceDiv.appendChild(priceErr);
			priceErr.innerHTML="*Each product must have price"
			priceFlag=true
		}
	  	
	  }
	  	

	  if(errorsArr.indexOf("category")!=-1)
	  {
	  	if(categoryFlag===false)
		{
			// console.log("wrong category")
		  	categoryErr=document.createElement('p');
			categoryDiv.appendChild(categoryErr);
			categoryErr.innerHTML="*Category is missing";
			categoryFlag=true;
		}
  	  }

  	  if(errorsArr.indexOf("picture")!=-1)
	  {
	  	if(pictureFlag===false)
		{
			// console.log("wrong picture")
		  	pictureErr=document.createElement('p');
			pictureDiv.appendChild(pictureErr);
			pictureErr.innerHTML="*picture is missing";
			pictureFlag=true;
		}
  	  }

  	  if(errorsArr.indexOf("pname_duplication")!=-1)
	  {
	  	if(pnameFlag===false)
		{
			// console.log("wrong name")
		  	pnameErr=document.createElement('p');
			pnameDiv.appendChild(pnameErr);
			pnameErr.innerHTML="*This Product name is already taken, choose another one"
			pnameFlag=true
		}
	  }
	}
	////to view a Success message
  if (response["status"]=="success")
  	{
  		// console.log("success")
	  	success=document.createElement('h3');
		form.appendChild(success);
		success.innerHTML="Product was edited Successfully"
		successFlag=true;
		document.getElementById("form").reset();
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
var PID;
document.addEventListener("DOMContentLoaded", function () {
	var fetchHTTPRequest = new XMLHttpRequest();
	if (!fetchHTTPRequest)
		alert('Giving up :( Cannot create an XMLHTTP instance');

	// fetchHTTPRequest.onreadystatechange = ajaxSuccess;
	PID = getQueryParameterByName('PID');

	fetchHTTPRequest.onreadystatechange = catchContents;
	fetchHTTPRequest.open('POST', 'http://localhost/Otlobly/php/product_get_single.php');
	fetchHTTPRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	fetchHTTPRequest.send('PID=' + encodeURIComponent(PID));

	function catchContents() {
		if (fetchHTTPRequest.readyState === XMLHttpRequest.DONE) {
			if (fetchHTTPRequest.status === 200) { // if success
				// alert(fetchHTTPRequest.responseText);
				if(fetchHTTPRequest.responseText["status"]==="go") {

					location.href = fetchHTTPRequest.responseText["link"];
				} else {
					productInfo = JSON.parse(fetchHTTPRequest.responseText); // receive response into array
					populateForm(); // function to loop on products array and create rows
					var newHiddenInput = document.createElement('input');
					newHiddenInput.setAttribute('type', 'hidden');
					newHiddenInput.setAttribute('name', 'PID');
					newHiddenInput.value = PID;
					form.appendChild(newHiddenInput);

					var Req = new XMLHttpRequest();
			 		Req.onload = ajaxSuccess;
			    	Req.open("post", "../php/get_category.php");
			    	Req.send();
				}
			} else {
				alert('There was a problem with the request.');
			}
		}
	}
	// var oReq = new XMLHttpRequest();
	// oReq.onload = ajaxSuccess;
	// oReq.open("post", "../php/admin_check.php");
	// oReq.send();
});


function populateForm() {
	pname.value = productInfo['pname'];
	price.value = productInfo['price'];
}
