var datefrom = document.getElementById('datefrom');
var dateto = document.getElementById('dateto');
var total_amount = 0;
var total_tr;
var order_row;
var clicked_before = 0;
datefrom.value = (new Date()).toISOString().split('T')[0];
dateto.value = (new Date()).toISOString().split('T')[0];

var tableBody = document.getElementById('orders_body');
var orderExpand = document.getElementById('orderExpand');

function deleteElement(parent, element) {
    parent.removeChild(element);
}


function appendIntoTable(row) {
    var tr = document.createElement('tr');
    tr.setAttribute('id', row["OID"]);
    tr.setAttribute('class', "hoverDiv");

    delete row["OID"];
    tableBody.appendChild(tr);
    for (var i in row) {
        var td = document.createElement('td');
        td.textContent = row[i];
        
        if (i === 'total_amount') {
            total_amount += parseFloat(row[i]);
        }

        if (row[i] === 'cancel') {
            td.setAttribute('class', 'action');
        }

        if (i === 'date') {
            td.setAttribute('class', 'date');
        }
        
        tr.appendChild(td);
    }
}

function makeOrderTable(row, td) {
    //td.innerHTML = '';
    orderDiv = document.createElement('div');
    orderDiv.setAttribute('class', "drinkdiv m-4");
    td.appendChild(orderDiv);
    div1 = document.createElement('div');
    div2 = document.createElement('div');
    div3 = document.createElement('div');
    img = document.createElement('img');
    div1.setAttribute('class', 'drinkimg');
    img.setAttribute("class", "rounded-circle imgindiv");
    img.setAttribute("src", "../img/product/"+row["PID"]+".jpg");
    div1.appendChild(img);
    orderDiv.appendChild(div1);
    div2.setAttribute('class', "rounded-circle price align-middle text-center");  
    div2.textContent = row["price"] + " LE";
    orderDiv.appendChild(div2);
    div3.setAttribute('class', 'dname text-center');
    div3.innerHTML = `<b>${row["pname"]}</b><b> x${row["number"]}</b>`;
    orderDiv.appendChild(div3);
}

function handler() {
    total_amount = 0;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            tableBody.innerHTML = '';
            var result = JSON.parse(this.responseText);
            if (result['rstatus']=="login") {
                location.href = '../pages/login.html';
                return;
            }
            else if (result['rstatus']=="go") {
                location.href = result["link"];
                return;
            }
            for (var i = 0; i < result.length; i++) {
                if (result[i]["status"] === "processing") {
                    result[i]["action"] = "cancel";
                } else {
                    result[i]["action"] = "";
                }
                appendIntoTable(result[i]);
            }
            if (result.length > 0) {
                total_tr = document.createElement('tr');
                total_tr.innerHTML = `<td colspan="4" class="text-center"><h4>Total = ${total_amount} LE</h4></td>`;
                tableBody.appendChild(total_tr);
            }
        }
    };
    xhttp.open("GET",
        "../php/myorders.php?datefrom=" + datefrom.value + "&dateto=" + dateto.value, true);
    xhttp.send();
}

function cancelOrder(id, amount) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var isOk = JSON.parse(this.responseText);
            /* if (result['rstatus']=="login") {
                location.href = '../pages/login.html';
                return;
            }
            else if (result['rstatus']=="go") {
                location.href = result["link"];
                return;
            } */
            if (isOk) {
                tableBody.removeChild(document.getElementById(id));  
                total_tr.children[0].children[0].textContent = 'Total = ' + (total_amount-amount) + ' LE'; 
                if (orderExpand !== undefined && order_row !== undefined) {
                    deleteElement(orderExpand, order_row);
                    clicked_before = 0;
                }   
            }
        }
    };
    xhttp.open("GET",
        "../php/cancel_order.php?id=" + id , true);
    xhttp.send();
}

function getOrder(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result['rstatus']=="login") {
                location.href = '../pages/login.html';
                return;
            }
            else if (result['rstatus']=="go") {
                location.href = result["link"];
                return;
            }
            order_row = document.createElement('tr');
            orderExpand.appendChild(order_row);
            var td = document.createElement('td');
            order_row.appendChild(td);
            td.setAttribute('colspan', "4");
            for (var i = 0; i < result.length; i++) {
                makeOrderTable(result[i], td);
            }
        }
    };
    xhttp.open("GET",
        "../php/get_order.php?id=" + id , true);
    xhttp.send();
}

tableBody.addEventListener('click', function(e) {
    if (e.target.getAttribute('class') === 'action') {
        //tableBody.removeChild(e.target.parentElement);
        // delete the row in database
        var deleted_amount = parseInt(e.target.previousElementSibling.textContent);
        cancelOrder(e.target.parentElement.getAttribute('id'), deleted_amount);
    }

    if (e.target.getAttribute('class') === 'date') {
        if (clicked_before) {
            deleteElement(orderExpand, order_row);
            clicked_before = 0;
        } else {
            getOrder(e.target.parentElement.getAttribute('id'));
            clicked_before = 1;
        }
        
    }
});


function ajaxSuccess () 
{
  var response=JSON.parse(this.responseText)
  console.log(response)
  ////to redirect uer if he is not admin
  if(response["status"]=="error")
    {
        location.href=response['login']
    }
    else
    {
        var Name=response['userName']
        var Id=response['userId']
        var userImg=document.getElementById('userImg')
        userImg.src="../img/user/"+Id+".jpg";
        userImg.onerror= function(e){e.target.src="../img/ninja.png";}
        document.getElementById('userName').innerHTML=Name;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var oReq = new XMLHttpRequest();
    oReq.onload = ajaxSuccess;
    oReq.open("post","../pages/user_img_name.php");
    oReq.send();
})
