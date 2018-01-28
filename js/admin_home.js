var containerElement = document.getElementById('containerElement');
var tables = document.getElementsByTagName('table');
var table;
var thead;
var tbody;
var result1;
var result2;
var row2Added = false;
var totalAmounts = [];
counterOnTables = 0;

function getAllUsersOrders() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        result1 = JSON.parse(this.responseText);
        for (var i=0; i<result1.length; i++) {
            makeFirstRows(result1[i]);
        }
        if (tables) {
            for (var i=0; i < tables.length; i++) {
                getOrder(tables[i].id);
            }
        }
      }
    };
    xhttp.open("GET", "../php/all_users_orders.php?", true);
    xhttp.send();
}

function makeFirstRows(row) {
    table = document.createElement('table');
    table.setAttribute('class', "table table-bordered table-hover");
    table.setAttribute('id', row["OID"]);

    containerElement.appendChild(table);
    thead = document.createElement('thead');
    thead.innerHTML = `<thead><tr>
      <th scope="col">Oreder Date</th>
      <th scope="col">Name</th>
      <th scope="col">Room</th>
      <th scope="col">Ext.</th>
      <th scope="col">Action</th>
    </tr></thead>`;
    table.appendChild(thead);
    tbody = document.createElement('tbody');
    table.appendChild(tbody);
    var tr1 = document.createElement('tr');
    

    for (var i=0; i<5; i++) {
        var td = document.createElement('td');
        switch (i) {
            case 0:
            td.textContent = row["date"];
            break;
            case 1:
            td.textContent = row["userName"];
            break;
            case 2:
            td.textContent = row["room"];
            break;
            case 3:
            td.textContent = row["extension"];
            break;
            case 4:
            td.textContent = "Deliver";
            td.setAttribute('class', "hoverDiv");
            td.addEventListener('click', change_status);
        }
        tr1.appendChild(td);
    }
    tbody.appendChild(tr1);
    totalAmounts.push(row["total_amount"]);
} 
  
function makeOrderTable(row) {
    //td.innerHTML = '';
    var orderDiv = document.createElement('div');
    orderDiv.setAttribute('class', "drinkdiv m-4");
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');
    var img = document.createElement('img');
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
    return orderDiv;
}

function getOrder(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            result2 = JSON.parse(this.responseText);
            var tr = document.createElement('tr');
            

            var td = document.createElement('td');
            td.setAttribute('colspan', '5');
            tr.appendChild(td);
            for (var i=0; i<result2.length; i++) {
                div = makeOrderTable(result2[i]);
                td.appendChild(div);
            }
            document.getElementById(id).lastElementChild.appendChild(tr);
            tr = document.createElement('tr');
            

            tr.innerHTML = `<td colspan="5" class="text-center"><h4>Total = ${totalAmounts[counterOnTables]} LE</h4></td>`;
            tables[counterOnTables].lastElementChild.appendChild(tr);
            counterOnTables++;
        }
    };
    xhttp.open("GET",
        "../php/get_order.php?id=" + id, true);
    xhttp.send();
}


function change_status(e) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var isOK = JSON.parse(this.responseText);
            if (isOK) {
                containerElement.removeChild(document.getElementById(e.target.parentElement.parentElement.parentElement.id));
            }
        }
    };
    xhttp.open("GET",
        "../php/change_status.php?id=" + e.target.parentElement.parentElement.parentElement.id, true);
    xhttp.send();
}

function ajaxSuccess ()
{
  var response =JSON.parse(this.responseText)
  console.log(response)
  if (response["admin"]=="true")
    {
        containerElement.style.display='block';
    }
   if (response['admin']=="false")
    {
    location.href="login.html";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var oReq = new XMLHttpRequest();
    oReq.onload = ajaxSuccess;
    oReq.open("post", "../php/admin_check.php");
    oReq.send();
})