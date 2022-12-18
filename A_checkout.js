let localUser = JSON.parse(localStorage.getItem("current_user"));

if (localUser !== null) {
    var localUserId = localUser.id;
}





async function fetchProducts() {
    let res = await fetch("https://63982e64044fa481d693d25f.mockapi.io/products")
    let data1 = await res.json();
    console.log(data1);

    
}

fetchProducts();



function renderItem(item,qty) {
    return `
    <div class="items-div">
    <div class="item-image">
        <img src=${item.img1} alt="">
    </div>
    <div id="item-dec">
        <p class="item-name">${item.title}</p>
        <p>
            400gms
            <span class="item-price" style="color:#D11243">&nbsp&nbsp&nbsp&#x20B9;${item.price}</span>
            <span class="item-maxPrice" ">&nbsp&nbsp&nbsp&#x20B9;${item.maxPrice}</span>
            <span class="item-quantity">&nbsp&nbsp&nbspqty:
                <span>${qty}</span>
            </span>
            <span class="item-dec-cancel">
                 x
            </span>
        </p>
        
    </div>
</div>`
}

// function maxPrice(item) {
//     if(item.maxPrice) {
//         return `<span class="item-maxPrice" style="color:#D11243">&nbsp&nbsp&nbsp$${item.maxPrice}</span>`
//     }
// }

let toTalPrice = 0;
let toTalDis = 0;
async function renderAllItem(product,quantity) {

    let res = await fetch("https://63982e64044fa481d693d25f.mockapi.io/products");

    let data = await res.json();

    let items = document.getElementById("items-main-div");

    items.innerHTML = ""

    let arr = data.map((item)=> {

        for (let i = 0; i < product.length; i++){
            qty = quantity[i];
            if (product[i] == item.id) {

                toTalPrice = toTalPrice + (item.price * qty)
                toTalDis = toTalDis + (item.discount * qty)
                return renderItem(item,qty)
                
            }
        }
        
    })
    // arr.join(" ");

    items.innerHTML = arr.join(" ");

    console.log("hi");
}

// renderAllItem();


async function getItems() {
    let res = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/users/${localUser.id}`)

    let data = await res.json();

    console.log(data)

    let product = [];
    let quantity = [];
    for (let i = 0; i < data.cart.length; i++) {
        product.push(data.cart[i][0]);
        quantity.push(data.cart[i][1])
        console.log("inloop")
    }
    

    console.log(data.cart);

    console.log("hi");

    console.log("product", product)

    renderAllItem(product,quantity);
}

getItems();

// to display real time slots

let realTS = document.getElementById("time-slots-left");

realTS.addEventListener("click", function(){
        document.getElementById("real-time-slots").style.display = "block";


        // to make proceed btn disabled

        let sProceed = document.getElementById("select-proceed");
sProceed.disabled = true;
if (sProceed.disabled) {
    sProceed.style.backgroundColor = "gray";
}


// let body = document.querySelector("body");
// body.style.backgroundColor = "rgba(0, 0, 0, 0.25)";
// body.style.position = "fixed"
// body.style.top = "0";
// body.style.left = "0";
// body.style.width = "100%";
// body.style.height = "100%";
// body.style.zIndex = "2";

// body.style.boxSizing = "border-box"


// document.getElementById("real-time-slots").style.display = "block";



})


// to make disappear real time slots

let cancelSign = document.getElementById("cancel-sign");

cancelSign.addEventListener("click", function () {
    document.getElementById("real-time-slots").style.display = "none";
    count = 0;
    let borderChandeBtn = document.querySelectorAll("#real-slots-time button");

    for (let i of borderChandeBtn) {
        i.style.borderColor = "gray";
    }
})


let cancelBtn = document.getElementById("cancel");

cancelBtn.addEventListener("click", function() {
    document.getElementById("real-time-slots").style.display = "none";
    count = 0;
    let borderChandeBtn = document.querySelectorAll("#real-slots-time button");

    for (let i of borderChandeBtn) {
        i.style.borderColor = "gray";
    }
})

let selProcBtn = document.getElementById("select-proceed");

selProcBtn.addEventListener("click", function() {
    document.getElementById("real-time-slots").style.display = "none";

    let footBtn = document.getElementById("pay-propay");
    footBtn.style.backgroundColor = "#D11243";
    footBtn.style.color = "#FFFFFF"

});

// to change the slots border color on selection

let borderChange = document.getElementById("real-slots-time");
console.log(borderChange);

var btn;
var count = 0;
borderChange.addEventListener("click", function(event) {
    if (count > 0) {
        btn.style.borderColor = "gray";
    }
    
    console.log(event);
   event.target.style.borderColor = "red";
     btn = event.target;


    count++;
   console.log("in borderchange")

   let sProceed = document.getElementById("select-proceed");

 console.log("count", count);

if (count>0) {
    sProceed.disabled = false;
    sProceed.style.backgroundColor = "#D11243";
} else {
    sProceed.disabled = true;
    sProceed.style.backgroundColor = "gray";
}
})


// removing item from cart

// function removeItem() {

// }


// getting todays date


let today = new Date();
console.log(today);

let date = today.getDate();

console.log("date", date);

let month = today.getMonth();

console.log("month", month)

const monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let monthName = monthArr[month];
let disDate = document.getElementById("del-time-date");

disDate.innerText = `9 Items Delivered Today(${date} ${monthName})`


let tommDate = date+1;

let todayDDisplay = document.getElementById("left-date");

todayDDisplay.innerText = `Today ${date} December`

let tomDDate = document.getElementById("right-date");

tomDDate.innerText = `Tomorrow ${tommDate} December`


let footBtn1 = document.getElementById("pay-propay");

footBtn1.addEventListener("click", function () {
    console.log("click on ")
    localStorage.setItem("total_Price" , JSON.stringify(toTalPrice))
    localStorage.setItem("total_Discount" , JSON.stringify(toTalDis))
    window.location.href = "A_payment.html";
})