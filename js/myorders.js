var datefrom = document.getElementById('datefrom');
var dateto = document.getElementById('dateto');

datefrom.value = (new Date()).toISOString().split('T')[0];
dateto.value = (new Date()).toISOString().split('T')[0];

var tableBody = document.getElementById('orders_body');

function appendIntoTable(row) {
    //tableBody.innerHTML = '';
    tr = document.createElement('tr');
    tr.setAttribute('id', row["OID"]);
    delete row["OID"];
    tableBody.appendChild(tr);
    for (var i in row) {
        td = document.createElement('td');
        td.textContent = row[i];
        tr.appendChild(td);
    }
}

function handler() {
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
        }
    };
    xhttp.open("GET",
        "../php/myorders.php?datefrom=" + datefrom.value + "&dateto=" + dateto.value, true);
    xhttp.send();
}
