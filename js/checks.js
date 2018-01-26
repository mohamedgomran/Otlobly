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

function deleteElement(parent, element) {
    parent.removeChild(element);
}

function usersTotalAmount() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            users_amounts.innerHTML = '';
            result = JSON.parse(this.responseText);
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                showUsersAmounts(result[i]);
            }
        }
    };
    xhttp.open("GET",
        "../php/checks_users_amount.php?datefrom=" + datefrom.value + "&dateto=" + dateto.value, true);
    xhttp.send();
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
            deleteElement(table, order_date_amount_table);
            console.log(order_date_amount_table);
            deleteElement(table, thead);
            clicked_before = 0;
        } else {
            console.log(e.target.parentElement.id);
            getOrdersOfUser(e.target.parentElement.id);
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
            console.log(result);
            table.appendChild(thead);
            for (var i = 0; i < result.length; i++) {
                appendIntoTable(result[i]);
            }
            /* if (result.length > 0) {
                total_tr = document.createElement('tr');
                total_tr.innerHTML = `<td colspan="4" class="text-center"><h4>Total = ${total_amount} LE</h4></td>`;
                tableBody.appendChild(total_tr);
            } */
        }
    };
    xhttp.open("GET",
        "../php/get_order_for_user.php?id=" + id + "&datefrom=" + datefrom.value + "&dateto=" + dateto.value, true);
    xhttp.send();
}

function appendIntoTable(row) {
    console.log('gemly');
    table.appendChild(order_date_amount_table);
    order_date_amount = document.createElement('tr');
    //tr.setAttribute('id', row["OID"]);
    delete row["OID"];
    delete row["status"];
    order_date_amount_table.appendChild(order_date_amount);
    for (var i in row) {
        var td = document.createElement('td');
        td.textContent = row[i];
        order_date_amount.appendChild(td);
    }
}