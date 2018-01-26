var form=document.getElementById('form');
var username=document.getElementById('name');
var nameDiv=document.getElementById('nameDiv')
var email=document.getElementById('email');
var emailDiv=document.getElementById('emailDiv')
var password=document.getElementById('password');
var passDiv=document.getElementById('passDiv');
var conf_pass=document.getElementById('confirm_password');
var nameFlag=false;
var emailFlag=false;
var passFlag=false;

username.addEventListener("input",function() {

	if(!username.value.match(/^[a-zA-Z ]{2,30}$/))
	{
		if(nameFlag===false)
		{
			nameErr=document.createElement('p');
			nameDiv.appendChild(nameErr);
			nameErr.innerHTML="*Username must be between 2 and 30 alphabetical or white space"
			nameFlag=true}
		}
	else if (nameFlag)
	{
		nameDiv.removeChild(nameErr)
		nameFlag=false;
	}
});

email.addEventListener("input",function() {

	if(!email.value.match(/\S+@\S+\.\S+/))
		{
		if(emailFlag===false)
		{
			emailErr=document.createElement('p');
			emailDiv.appendChild(emailErr);
			emailErr.innerHTML="*Email must be in the form aaa@aaa.aaa"
			emailFlag=true}
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

function ajaxSuccess () {
  console.log(this.responseText);
}

function AJAXSubmit (oFormElement) {
  if (!oFormElement.action) { return; }
  var oReq = new XMLHttpRequest();
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
