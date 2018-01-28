var save = document.getElementById("submit");
save.addEventListener('click', update_category);

function update_category() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            isOK = JSON.parse(this.responseText);
            if (isOK) {
                location.href = 'add_product.html';
            } else {
                var message = document.getElementById('message');
                message.style = 'block';
                message.style.color = 'red';
                message.style.fontSize = '20px';
                message.textContent =
                    `category is already exist or you type nothing!`;
                document.getElementById('category').value = '';
            }
        }
    };
    xhttp.open("GET", "../php/add_category.php?category=" + document.getElementById('category').value, true);
    xhttp.send();
}