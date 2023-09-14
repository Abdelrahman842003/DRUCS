// get total
// creat product
// sava localStorage
// clear inputs
// read
// count
// delete
// update
// search
// clean data

let title = document.getElementById("title");

let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");

let count = document.getElementById("count");
let category = document.getElementById("category");

let total = document.getElementById("total");
let submitCreate = document.getElementById("create");

let mood = "create";
let tmp;
// get total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.cssText = "background-color:#8b038b; width:20%; border:2px solid #8b038b; border-radius:10px; font-size:18px; padding:10px; margin:7px; ";
    } else {
        total.style.cssText = "background-color: #470047";
        total.innerHTML = 0;
    }
}

// creat product and sava localStorage

let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
} else {
    dataProduct = []
}

submitCreate.onclick = () => {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        total: total.innerHTML,
        discount: discount.value,
        ads: ads.value,
        count: count.value,
        category: category.value.toLowerCase(),

    }
    // count
    if (title.value != "" && price.value != "" && category.value != "" && newProduct.count < 100) {

        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let index = 0; index < newProduct.count; index++) {
                    dataProduct.push(newProduct)
                }
            } else {
                dataProduct.push(newProduct)
            }
        } else {
            dataProduct[tmp] = newProduct;
            mood = "create";
            count.style.display = "block";
            submitCreate.innerHTML = "Create"
        }
        clearData();
    }

    localStorage.setItem('product', JSON.stringify(dataProduct));

    showData();

}
// clear inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    category.value = "";
    count.value = "";
    total.innerHTML = "0";
    total.style.cssText = "background-color:#470047; padding:7px5px; border-radius:3%;";

}
// read
function showData() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table +=
            `<tr>
                    <td>${[i+1]}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].total}</td>
                    <td><button id="update" onclick="updateData(${i})">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`

    }
    document.getElementById("tbody").innerHTML = table;
    let deleteAll = document.getElementById("deleteAll")
    if (dataProduct.length > 1) {
        deleteAll.innerHTML = `<button onclick= "deleteAll()" >Delete All (${dataProduct.length})</button>`
    } else {
        deleteAll.innerHTML = ``
    }
}
showData();

// delete
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct)
    showData()
}

function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    count.style.display = "none";
    getTotal()
    submitCreate.innerHTML = "Update"
    mood = "update"
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    });
}
// search
let searchMood = "title";
let search = document.getElementById("Search");

function getSearchMood(id) {
    if (id == "search") {
        searchMood = 'title'
    } else {
        searchMood = 'category';
    }
    search.placeholder = "Search By " + searchMood
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        if (searchMood == 'title') {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table +=
                    `<tr>
                    <td>${[i]}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].total}</td>
                    <td><button id="update" onclick="updateData(${i})">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`

            }
        } else {

            if (dataProduct[i].category.includes(value)) {
                table +=
                    `<tr>
                    <td>${[i]}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].total}</td>
                    <td><button id="update" onclick="updateData(${i})">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`

            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}