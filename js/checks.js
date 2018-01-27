var datefrom = document.getElementById('datefrom');
var dateto = document.getElementById('dateto');
datefrom.value = "2017-01-01";
dateto.value = (new Date()).toISOString().split('T')[0];
var users_amounts = document.getElementById('users_amounts');
var clicked_before = 0;
var order_date_amount;
var table = document.getElementById('table');
var order_date_amount_table = document.createElement('tbody');
var thead = document.createElement('thead');
thead.innerHTML = `<tr><th scope="col">Order Date</th><th scope="col">Amount</th></tr>`;
var date_clicked_before = 0;
var orderExpand = document.getElementById('orderExpand');
var order_row;
var select_user = document.getElementById('select_user');

function deleteElement(parent, element) {
    parent.removeChild(element);
}

function usersTotalAmount() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            users_amounts.innerHTML = '';
            select_user.innerHTML = "<option>Select User</option>";
            result = JSON.parse(this.responseText);
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                showUsersAmounts(result[i]);
                fillSelectUser(result[i]);
            }
        }
    };
    xhttp.open("GET",
        "../php/checks_users_amount.php?datefrom=" + datefrom.value + "&dateto=" + dateto.value, true);
    xhttp.send();
}

function fillSelectUser(row) {
    var user_option = document.createElement('option');
    user_option.textContent = row["userName"];
    select_user.appendChild(user_option);
}

function showUsersAmounts(row) {
    var tr = document.createElement('tr');
    tr.setAttribute('id', row["UID"]);
    var td_1 = document.createElement('td');
    var td_2 = document.createElement('td');
    td_1.textContent = row["userName"];
    td_1.setAttribute('class', 'user');
    td_2.textContent = row["total_amount"];
    tr.appendChild(td_1);
    tr.appendChild(td_2);
    users_amounts.appendChild(tr);
}

users_amounts.addEventListener('click', function(e) {

    if (e.target.getAttribute('class') === 'user') {
        if (clicked_before) {
            order_date_amount_table.removeEventListener('click', orderDateHandler);
            deleteElement(table, order_date_amount_table);
            console.log(order_date_amount_table);
            deleteElement(table, thead);
            clicked_before = 0;
            if (date_clicked_before) {
                deleteElement(orderExpand, order_row);
                date_clicked_before = 0;
            }
        } else {
            getOrdersOfUser(e.target.parentElement.id);
            order_date_amount_table.addEventListener('click', orderDateHandler);
            clicked_before = 1;
        }
        console.log('clicked');
    }
});

function getOrdersOfUser(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            order_date_amount_table.innerHTML = '';
            var result = JSON.parse(this.responseText);
            //console.log(result);
            table.appendChild(thead);
            for (var i = 0; i < result.length; i++) {
                appendIntoTable(result[i]);
            }
        }
    };
    xhttp.open("GET",
        "../php/get_order_for_user.php?id=" + id + "&datefrom=" + datefrom.value + "&dateto=" + dateto.value, true);
    xhttp.send();
}

function appendIntoTable(row) {
    table.appendChild(order_date_amount_table);
    order_date_amount = document.createElement('tr');
    order_date_amount.setAttribute('id', row["OID"]);
    delete row["OID"];
    delete row["status"];
    order_date_amount_table.appendChild(order_date_amount);
    for (var i in row) {
        var td = document.createElement('td');
        td.textContent = row[i];
        order_date_amount.appendChild(td);
        if (i === 'date') {
            td.setAttribute('class', 'date');
        }
    }
}

function orderDateHandler(e) {
    if (e.target.getAttribute('class') === 'date') {
        //tableBody.removeChild(e.target.parentElement);
        // delete the row in database
        //var deleted_amount = parseInt(e.target.previousElementSibling.textContent);
        //cancelOrder(e.target.parentElement.getAttribute('id'), deleted_amount);
        console.log(e.target);
        if (e.target.getAttribute('class') === 'date') {
            if (date_clicked_before) {
                deleteElement(orderExpand, order_row);
                date_clicked_before = 0;
            } else {
                getOrder(e.target.parentElement.getAttribute('id'));
                date_clicked_before = 1;
            }
            
        }

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