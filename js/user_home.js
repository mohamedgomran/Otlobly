var productsDiv = document.getElementById('products')
              // <div class="drinkdiv m-4">
              //     <div class="drinkimg"><img src="../img/Drink.ico" class="rounded-circle imgindiv"></div>
              //     <div class="dname text-center">Tea</div>
              //     <div class="rounded-circle price align-middle text-center">20 LE</div>
              // </div>


function appendIntoTable(row) {
    var parentDiv = document.createElement('div')
    parentDiv.setAttribute('class', "drinkdiv m-4")
    parentDiv.setAttribute("id" ,row['PID'])
    
	var  img = document.createElement('img')
    img.setAttribute("class" , "rounded-circle imgindiv")
    img.src = "../img/product/"+row['PID']+".jpg"

	var  imgDiv = document.createElement('div')
    imgDiv.setAttribute("class" ,"drinkimg")
    imgDiv.appendChild(img)

    var productName = document.createElement('div')
    productName.setAttribute("class" ,"dname text-center")
    productName.innerHTML = row['pname']

    var productPrice = document.createElement('div')
    productPrice.setAttribute("class" ,"rounded-circle price align-middle text-center")
    productPrice.innerHTML = row['price']+" LE"
    
    parentDiv.appendChild(imgDiv)
    parentDiv.appendChild(productName)
    parentDiv.appendChild(productPrice)

    productsDiv.appendChild(parentDiv)

}



function ajaxSuccess () {

	var response = JSON.parse(this.responseText)
  	console.log(response);
	if (response['rstatus']=="error") {
	}
	else if (response['rstatus']=="login") {
		location.href = '../pages/login.html'
	}
	else {
		for (i in response) {
			appendIntoTable(response[i])
		}
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

