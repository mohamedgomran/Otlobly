var datefrom = document.getElementById('datefrom');
var dateto = document.getElementById('dateto');
var total_amount = 0;

datefrom.value = (new Date()).toISOString().split('T')[0];
dateto.value = (new Date()).toISOString().split('T')[0];

var tableBody = document.getElementById('orders_body');

function appendIntoTable(row) {
    tr = document.createElement('tr');
    tr.setAttribute('id', row["OID"]);
    delete row["OID"];
    tableBody.appendChild(tr);
    for (var i in row) {
        td = document.createElement('td');
        td.textContent = row[i];
        
        if (i === 'total_amount') {
            total_amount += parseInt(row[i]);
        }

        if (row[i] === 'cancel') {
            td.setAttribute('class', 'action');
        }
        
        tr.appendChild(td);
    }
}

function handler() {
    total_amount = 0;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            tableBody.innerHTML = '';
            result = JSON.parse(this.responseText);
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
            isOk = JSON.parse(this.responseText);
            if (isOk) {
                tableBody.removeChild(document.getElementById(id));  
                total_tr.children[0].children[0].textContent = 'Total = ' + (total_amount-amount) + ' LE';    
            }
        }
    };
    xhttp.open("GET",
        "../php/cancel_order.php?id=" + id , true);
    xhttp.send();
}

tableBody.addEventListener('click', function(e) {
    if (e.target.getAttribute('class') === 'action') {
        //tableBody.removeChild(e.target.parentElement);
        // delete the row in database
        deleted_amount = parseInt(e.target.previousElementSibling.textContent);
        cancelOrder(e.target.parentElement.getAttribute('id'), deleted_amount);
    }

});
