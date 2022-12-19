var totalPrice;
var totalDisc;
var finalTotal;

function priceLoad() {
    console.log("in priceLoad")
    let payBox = document.getElementById("payment-detail")

    totalPrice = localStorage.getItem("total_Price")
    totalDisc = localStorage.getItem("total_Discount")

    // let roundedValue = (totalPrice - totalDisc + 1) - (totalPrice - totalDisc)

    finalTotal = (totalPrice - totalDisc)>=399 ? totalPrice - totalDisc : totalPrice - totalDisc+39;

    payBox.innerHTML = "";

    let format = `<div id="bill-detail">Bill Datails</div>
    <div id="pay-subtotal" class="final-pay-div">
        <span class="bill-left-span">Subtotal</span>
        &nbsp;&nbsp;&nbsp;
        <span class="bill-right-span">${totalPrice}</span>
    </div>
    <div id="pay-del-charge" class="final-pay-div">
        <span class="bill-left-span">Delivery Charge</span>
        &nbsp;&nbsp;&nbsp;
        <span class="bill-right-span">${(totalPrice - totalDisc)>399 ? '0' : '39'}</span>
    </div>
    <div id="pay-discount" class="final-pay-div">
        <span class="bill-left-span">Discount</span>
        &nbsp;&nbsp;&nbsp;
        <span class="bill-right-span">${totalDisc}</span>
    </div>
    <div id="pay-walllet" class="final-pay-div">
        <span class="bill-left-span">Licious Wallet</span>
        &nbsp;&nbsp;&nbsp;
        <span class="bill-right-span">0</span>
    </div>
    <div id="pay-rounded" class="final-pay-div">
        <span class="bill-left-span">Rounded Value</span>
        &nbsp;&nbsp;&nbsp;
        <span class="bill-right-span">0</span>
    </div>
    <hr>
    <div id="pay-total" class="final-pay-div">
        <span class="bill-left-span" style="font-size:20px ;font-weight: 700" >Total</span>
        &nbsp;&nbsp;&nbsp;
        <span style="color:#D11243;font-size:20px ;font-weight: 700" class="bill-right-span">&#8377;&nbsp;${finalTotal}</span>
    </div>`


    payBox.innerHTML = format;
}

priceLoad();



let payBtn = document.getElementById("pay-button");

payBtn.addEventListener("click", function () {
    let cardDetail = JSON.parse(localStorage.getItem("card_Details"));

    let _Name = document.getElementById("cardName").value;
    let cvvNo = document.getElementById("cardCvv").value;
    let cardMo = document.getElementById("careMonth").value;
    let cardYear = document.getElementById("cardYear").value;
    let cardNo = document.getElementById("user-card-no").value;
    
    let user_info = JSON.parse(localStorage.getItem("current_user"));
    let new_order = {};
    new_order.user_id = user_info.id;
    new_order.total_order = user_info.cart;
    new_order.total_Amount = finalTotal;

    ;(async ()=>{
        await fetch("https://63982e64044fa481d693d25f.mockapi.io/total_orders",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(new_order)
        })
    })();

    if (cardDetail.name == _Name && cardDetail.card_no == cardNo && cardDetail.cvv_no == cvvNo && cardDetail.month == cardMo && cardDetail.year == cardYear){
        deleteApiCart();
    } else {
        alert("Wrong Card Information")
    }




})


function paybtnLoad() {
    payBtn.innerHTML = ` Pay&nbsp; &#8377;${finalTotal}`
}

paybtnLoad()


// adding card detail to local storage


let cardDetails = {
    name: "Team Licious",
    card_no: 1234567812345678,
    month: 12,
    year: 2023,
    cvv_no: 1234,

}


function addCardDetails() {
    console.log("in addcardDetails")
    localStorage.setItem("card_Details", JSON.stringify(cardDetails));

}

addCardDetails();


// deleting cart items from api


async function deleteApiCart() {
    let currentUUser = JSON.parse(localStorage.getItem("current_user"));

    currentUUser.cart = [];

    let res = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/users/${currentUUser.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(currentUUser)

    })


    localStorage.setItem("current_user", JSON.stringify(currentUUser));
    window.location.href = "congratulations.html";
}



// deleting cart items from local storage

// function deleteLSCart() {
//     let currentUUser = JSON.parse(localStorage.getItem("current_user"));

//     currentUUser.cart = [];



// }



// limiting no of input fields




// let _Name = document.getElementById("cardName");
//     let cvvNo = document.getElementById("cardCvv");
//     let cardMo = document.getElementById("careMonth");
//     let cardYear = document.getElementById("cardYear");
//     let cardNo = document.getElementById("user-card-no");


//     cvvNo.oninput = () => {
//         if(cvvNo.value.length > cvvNo.maxlength) {
//             cvvNo.value = cvvNo.value.slice(0, cvvNo.maxlength)
//         }
//     }
//     /




