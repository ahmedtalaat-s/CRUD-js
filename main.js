var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var rows = document.getElementById("rows");
var mainBtn = document.getElementById("mainBtn");

var products;

check();

function addItem() {
    if (nameregex() && priceregex() && catregex() && descregex() ) {
        var productobject = {
            pName: productName.value,
            pPrice: productPrice.value,
            Pcat: productCategory.value,
            pDesc: productDescription.value,
        };
        products.push(productobject);
        display(products);
        localStorage.setItem("data", JSON.stringify(products));
        clear()
    }
}

function check() {
    if (localStorage.getItem("data") == null) products = [];
    else {
        products = JSON.parse(localStorage.getItem("data"));
        display(products);
    }
}

function display(arr) {
    var box = "";
    for (i = 0; i <arr.length; i++) {
        box += `
        <tr>
            <td>${i + 1}</td>
            <td>${arr[i].pName}</td>
            <td>${arr[i].pPrice}</td>
            <td>${arr[i].Pcat}</td>
            <td>${arr[i].pDesc}</td>
            <td><button class="btn btn-danger" onclick="Del(${i})">Delete</button></td>
            <td><button class="btn btn-warning" onclick="Update(${i})">Update</button></td>
        </tr>
        `;
        
    }
    rows.innerHTML = box;
}

function Del(index) {
    products.splice(index, 1);
    display(products);
    localStorage.setItem("data", JSON.stringify(products));
}

var gIndex;

function Update(index) {
    gIndex = index;
    productName.value = products[index].pName;
    productPrice.value = products[index].pPrice;
    productCategory.value = products[index].Pcat;
    productDescription.value = products[index].pDesc;
    
    mainBtn.innerHTML = "Update";
}

function edit() {
    if (nameregex() && priceregex() && catregex() && descregex()) {
        products[gIndex].pName = productName.value;
        products[gIndex].pPrice = productPrice.value;
        products[gIndex].Pcat = productCategory.value;
        products[gIndex].pDesc = productDescription.value;
        display(products);
        localStorage.setItem('data', JSON.stringify(products))
        mainBtn.innerHTML = 'Add'
        clear()
    }
}

function clear() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value ="";
    productDescription.value = "";
}
mainBtn.onclick = () => {
    if (mainBtn.innerHTML == "Add") addItem();
    else edit();
};

function search(ele) {
    var searchedarr = [];
    for (i = 0; i < products.length; i++){
        if (products[i].pName.toLowerCase().includes(ele.value.toLowerCase())) {
            searchedarr.push(products[i])
        }
    }
    display(searchedarr)
}


function nameregex() {
    var regex = /[a-zA-Z]{1,20}/
    if (regex.test(productName.value)) {
        return true;
    } else {
        alert("false pattern");
        return false;
    }
}
function priceregex() {
    var regex = /[0-9]{1,10}/
    if (regex.test(productPrice.value)) {
        return true;
    } else {
        alert("false pattern");
        return false;
    }
}
function catregex() {
    var regex = /[a-zA-Z]{1,10}/
    if (regex.test(productCategory.value)) {
        return true;
    } else {
        alert("false pattern");
        return false;
    }
}
function descregex() {
    var regex = /[a-zA-Z]{1,40}/
    if (regex.test(productDescription.value)) {
        return true;
    } else {
        alert("false pattern");
        return false;
    }
}