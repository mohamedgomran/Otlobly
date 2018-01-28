var room=document.getElementById('select');
var form = document.getElementById('form')
var cst= document.getElementById('cst')

var totalAmount = function () {
	var totalDiv = document.getElementById('total')
	var mainDiv = document.getElementById('orderlist').children
	var totalLE = 0
	for(var i = 0, length1 = mainDiv.length; i < length1; i++){
		totalLE+= parseFloat(mainDiv[i].children[2].value)
	}
	totalDiv.nextElementSibling.innerHTML = totalLE+" LE"
}

form.addEventListener('input', totalAmount)

cst.addEventListener("focus", function() {
	var Req = new XMLHttpRequest();
 		Req.onload = ajaxUserReply;
    	Req.open("post", "../php/user_get_all_names.php");
    	Req.send();
})


room.addEventListener("focus", function() {
	var Req = new XMLHttpRequest();
 		Req.onload = ajaxSuccess;
    	Req.open("post", "../php/get_rooms.php");
    	Req.send();
})

function roomManp(roomNo)
{
	let option=document.createElement('option');
	room.appendChild(option);
	option.innerHTML=roomNo;
	option.value=roomNo;
}

function userManp(Id,Name)
{
	let option=document.createElement('option');
	cst.appendChild(option);
	option.innerHTML=Name;
	option.value=Id;
}
var delRow = function (e) {
	if(e.target.parentElement.parentElement.children.length==1){
		document.getElementById('form').style.display = "none"
	}
	e.target.parentElement.remove()
	totalAmount()
}

var exist = function (parent, product) {
	for (var i in parent.children) {
		if (parent.children.hasOwnProperty(i)) {
			if(parent.children[i].id==product){
				return parent.children[i]
			}
		}
	}
	return 0
}

var addToOrder = function (e) {
	if (e.target.className=="drinkdiv m-4") {
		var mainDiv = document.getElementById('orderlist')
		var form = document.getElementById('form')
		if (form.style.display == "none") {form.style.display = "block"}

		if (productRow = exist(mainDiv,"p_"+e.target.id)) {
			productRow.children[1].value++
			productRow.children[2].value = parseInt(productRow.children[2].value) + parseInt(e.target.children[2].innerHTML.split(" ")[0])
			totalAmount()
			return
		}

	    var parentDiv = document.createElement('div')
    	parentDiv.setAttribute('class', "border row m-1")
    	parentDiv.setAttribute('id', "p_"+e.target.id)


	 	var productName = document.createElement('div')
	    productName.setAttribute("class" ,"col-4")
	    productName.innerHTML = e.target.children[1].innerHTML


	 	var productInput = document.createElement('input')
	    productInput.setAttribute("class" ,"col-3")
	    productInput.setAttribute("type" ,"number")
	    productInput.setAttribute("name" ,"p_"+e.target.id)
	    productInput.setAttribute("value" , "1")
	    productInput.setAttribute("min" , "1")
	    productInput.setAttribute("oninput" , "output_"+e.target.id+".value=this.value*"+e.target.children[2].innerHTML.split(" ")[0])

	 	var productOutput = document.createElement('input')
	    productOutput.setAttribute("class" ,"col-3")
	    productOutput.setAttribute("type" ,"output")
	    productOutput.setAttribute("value" ,e.target.children[2].innerHTML.split(" ")[0])
	    productOutput.setAttribute("name" ,"output_"+e.target.id)
	    productOutput.setAttribute("for" ,"p_"+e.target.id)

	    var delButton = document.createElement('button')
	    delButton.setAttribute("class" ,"btn")
	    delButton.setAttribute("type" ,"button")
	    delButton.addEventListener('click', delRow)
	    delButton.innerHTML = "X"

	    parentDiv.appendChild(productName)
	    parentDiv.appendChild(productInput)
	    parentDiv.appendChild(productOutput)
	    parentDiv.appendChild(delButton)

	    mainDiv.insertBefore(parentDiv, mainDiv.children[0])
		totalAmount()
	}
}

var productsDiv = document.getElementById('products')
productsDiv.addEventListener('click', addToOrder)

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

function ajaxUserReply() {
	var users=JSON.parse(this.responseText)
	if(users)
		{
			for (var i = 0; i < users.length; i++) {
				var uname=users[i]['userName']
				var id=users[i]['UID']
				userManp(id,uname)
			};
		}
}

function ajaxSuccess () {

	var response = JSON.parse(this.responseText)
	if (response['get']=='room')
		{
			let allRooms=response['rooms'];
			for (var i = 0; i < allRooms.length; i++) {
				roomManp(allRooms[i]['room'])
			};
		}

	else if (response['rstatus']=="login") {
		location.href = '../pages/login.html'
	}
	else if (response['rstatus']=="submitted") {
		var mainDiv = document.getElementById('orderlist')
		mainDiv.innerHTML=""
		document.getElementById('form').style.display = 'none'
	}
	else {
		for (i in response) {
			var mainDiv = document.getElementById('mainDiv');
			mainDiv.style.display='block'
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
    	oReq.open("post", "../php/order_admin.php");
    	oReq.send();
});

