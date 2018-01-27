var form=document.getElementById('form');
var pname=document.getElementById('product');
var select=document.getElementById('select');
var pnameDiv=document.getElementById('nameDiv')
var priceDiv=document.getElementById('priceDiv');
var categoryDiv=document.getElementById('categoryDiv')
var price=document.getElementById('price');

var pnameFlag=false;
var priceFlag=false;
var categoryFlag=false;
var successFlag=false;

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
select.addEventListener("input",function() {

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
	select.appendChild(option);
	option.innerHTML=cname;
	option.value=CID;
}
///////////////ajax response////////////////////
function ajaxSuccess ()
{
  var response = JSON.parse(this.responseText)
  console.log(response)
  if (response["admin"]=="true")
  	{
  		form.style.display='block';
  	}
   if (response['admin']=="false")
  	{
  	location.href="login.html";
  	}
  
  else{
		if (response["place"]=="category")
	  	{
	  		var rows=response["rows"]
	  		console.log(rows);
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
  	  console.log("errors found")
  	  errorsArr=response['errors']
	  if(errorsArr.indexOf("pname")!=-1)
	  {
	  	if(pnameFlag===false)
		{
			console.log("wrong name")
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
			console.log("wrong price")
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
			console.log("wrong category")
		  	categoryErr=document.createElement('p');
			categoryDiv.appendChild(categoryErr);
			categoryErr.innerHTML="*Category is missing";
			categoryFlag=true;
		}
  	  }

  	  if(errorsArr.indexOf("pname_duplication")!=-1)
	  {
	  	if(pnameFlag===false)
		{
			console.log("wrong name")
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
  		console.log("success")
	  	success=document.createElement('h3');
		form.appendChild(success);
		success.innerHTML="Product was added Successfully"
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
document.addEventListener("DOMContentLoaded", function () {
  	var oReq = new XMLHttpRequest();
 	oReq.onload = ajaxSuccess;
    oReq.open("post", "../php/admin_check.php");
    oReq.send();
})

select.addEventListener("focus", function() {
	var Req = new XMLHttpRequest();
 		Req.onload = ajaxSuccess;
    	Req.open("post", "../php/get_category.php");
    	Req.send();
})