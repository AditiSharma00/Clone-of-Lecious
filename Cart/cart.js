let view_cart_btn = document.querySelector("#view_cart_btn");
let gray_cart_background = document.querySelector("#gray_cart_background")
let empty_cart_sec = document.querySelector("#empty_cart_sec");
let discount_above_399 = document.querySelector("#discount_above_399");
let current_user = JSON.parse(localStorage.getItem("current_user")) || [];
let cart_field = document.querySelector("#cart_field");
let close_cart_background = document.querySelector("#close_cart_background");
let close_cart_icon = document.querySelector("#close_cart_icon");
let cart_items_UL = document.querySelector("#cart_items_UL");
let cart_subtotal = document.querySelector("#cart_subtotal");
let cart_delivery_charge = document.querySelector("#cart_delivery_charge");
let cart_total_discount = document.querySelector("#cart_total_discount");
let total_bill_cart = document.querySelector("#total_bill_cart");
let total_payable_amount_cart = document.querySelector("#total_payable_amount_cart");
let proceed_to_checkout_btn = document.querySelector("#proceed_to_checkout_btn");
let cart_suggestion = document.querySelector("#cart_suggestion");
let select_or_add_address = document.querySelector("#add_address");

view_cart_btn.addEventListener("click", () => {
    let all_cart_items_id = current_user.cart || '0';
    if (all_cart_items_id == '0' || all_cart_items_id.length == 0) {
        cart_field.style.display = "none";
        discount_above_399.style.display = "none";
        gray_cart_background.style.display = "flex";
        empty_cart_sec.style.display = "flex";

    } else {
        listAllCartItems(all_cart_items_id);
        getCartSuggestion();
        empty_cart_sec.style.display = "none";
        discount_above_399.style.display = "flex";
        cart_field.style.display = "block";
        gray_cart_background.style.display = "flex"
    }
})
close_cart_background.addEventListener("click", closeCart);
close_cart_icon.addEventListener("click", closeCart)

function closeCart() {
    cart_field.style.display = "none";
    discount_above_399.style.display = "none";
    gray_cart_background.style.display = "none";
    empty_cart_sec.style.display = "none";
}

async function listAllCartItems(all_item_id) {
    proceed_to_checkout_btn.style.backgroundColor = "#bcbcbc";
    proceed_to_checkout_btn.style.color = "#6d6e71";
    proceed_to_checkout_btn.removeEventListener("click", gotoAddressPage)
    let all_cart_cards = [];
    for (let i = 0; i < all_item_id.length; i++) {
        let [id, quantity] = all_item_id[i];
        let all_item_promise = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/products/${id}`);
        let oneCartProduct = await all_item_promise.json();
        all_cart_cards.push(
            `<li  data-id="${i + 1}">
                <div>${i + 1}</div>
                <div>
                    <div>
                        <div class="cart_item_name">${oneCartProduct.title}</div>
                        <svg class="remove_cart_item" data-index="${i}" onclick="removeCartItem()" viewBox="0 0 24 24">
                            <path xmlns="http://www.w3.org/2000/svg"
                                d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <div>
                            <span style="color: #D11243; font-size: 13px;">₹${oneCartProduct.price}.00</span>
                            <span
                                style="text-decoration: line-through; color: #6d6e71; font-size: 13px;">₹${oneCartProduct.maxPrice}</span>
                        </div>
                        <div>
                            <button class="quantity_dec" data-index="${i}" onclick="decreaseCartItemQuantity()">-</button>
                            <span class="quantity_count">${quantity}</span>
                            <button class="quantity_inc" data-index="${i}" onclick="increaseCartItemQuantity()">+</button>
                        </div>
                    </div>
                </div>
            </li>`
        )
        cart_items_UL.innerHTML = all_cart_cards.join(" ");
    }
    adjustCartPricing()
}

async function getCartSuggestion() {
    let all_suggested_item = [];
    let a = await fetch("https://63982e64044fa481d693d25f.mockapi.io/products");
    let all_backend_products = await a.json();
    for (let i = 0; i < 10; i++) {
        let id = Math.floor(Math.random() * (27 - 1) + 1); //-------------
        let if_item_already_in_cart = false;
        for (let i = 0; i < current_user.cart.length; i++) {
            if (current_user.cart[i][0] == id) {
                if_item_already_in_cart = true;
                break;
            }
        }
        if (if_item_already_in_cart == true) {
            // all_suggested_item.push(
            //     `<div>
            //         <div>${all_backend_products[id-1].discount}% Off</div>
            //         <img src="${all_backend_products[id-1].img1}"
            //             alt="">
            //         <div class="suggested_item_name">${all_backend_products[id-1].title}</div>
            //         <div>
            //             <span style="color:#6d6e71; font-size: 13px">₹${all_backend_products[id-1].price}</span>
            //             <span style="text-decoration: line-through; color:#cbcbcb!important; font-size: 13px">₹${all_backend_products[id-1].maxPrice}</span>
            //         </div>
            //         <button style="background-color : #d1124236; border : 2px solid #D11243;" id="add_cart_suggestion_item_btn" data-id="${all_backend_products[id-1].id}">In Cart</button>
            //     </div>`
            // )
        } else {
            all_suggested_item.push(
                `<div>
                    <div>${all_backend_products[id - 1].discount}% Off</div>
                    <img src="${all_backend_products[id - 1].img1}"
                        alt="">
                    <div class="suggested_item_name">${all_backend_products[id - 1].title}</div>
                    <div>
                        <span style="color:#6d6e71; font-size: 13px">₹${all_backend_products[id - 1].price}</span>
                        <span style="text-decoration: line-through; color:#cbcbcb!important; font-size: 13px">₹${all_backend_products[id - 1].maxPrice}</span>
                    </div>
                    <button style="" id="add_cart_suggestion_item_btn" onclick="add_suggested_item_to_cart()" data-id="${all_backend_products[id - 1].id}">ADD</button>
                </div>`
            )
        }
    }
    cart_suggestion.innerHTML = all_suggested_item.join(" ");
}


async function add_suggested_item_to_cart() {
    event.target.innerText = "In Cart"
    event.target.style.backgroundColor = "#d1124236";
    event.target.style.border = "2px solid #D11243"
    event.target.removeAttribute("id");
    event.target.setAttribute("id", "cart_suggestion_item_already_incart_btn");
    current_user.cart.push([event.target.dataset.id, 1]);
    localStorage.setItem("current_user", JSON.stringify(current_user));
    let b = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/users/${current_user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(current_user)
    })
    listAllCartItems(current_user.cart);
}

async function removeCartItem() {
    let index = event.target.dataset.index
    current_user.cart.splice(index, 1);
    localStorage.setItem("current_user", JSON.stringify(current_user));
    let a = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/users/${current_user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(current_user)
    })
    if (current_user.cart.length == 0) {
        cart_field.style.display = "none";
        discount_above_399.style.display = "none";
        gray_cart_background.style.display = "flex";
        empty_cart_sec.style.display = "flex";
    } else {
        listAllCartItems(current_user.cart);
    }
}

async function increaseCartItemQuantity() {
    let current_quantity = event.target.previousElementSibling.innerText;
    if (current_quantity < 10) {
        let new_quantity = ++event.target.previousElementSibling.innerText;
        adjustCartPricing()
        let item_index = event.target.dataset.index;
        current_user.cart[item_index][1] = new_quantity;
        let a = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/users/${current_user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(current_user)
        })
        let b = await a.json()
        localStorage.setItem("current_user", JSON.stringify(b))
    }
}

async function decreaseCartItemQuantity() {
    let current_quantity = event.target.nextElementSibling.innerText;
    if (current_quantity > 1) {
        let new_quantity = --event.target.nextElementSibling.innerText;
        adjustCartPricing()
        let item_index = event.target.dataset.index;
        current_user.cart[item_index][1] = new_quantity;
        let a = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/users/${current_user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(current_user)
        })
        let b = await a.json()
        localStorage.setItem("current_user", JSON.stringify(b))
    }
}

async function adjustCartPricing() {
    let max_Price = 0;
    let subtotal = 0;
    for (let i = 0; i < cart_items_UL.childNodes.length; i += 2) {
        let price_quantity_div = cart_items_UL.childNodes[i].childNodes[3].childNodes[3];
        let one_cart_price = +(price_quantity_div.childNodes[1].childNodes[1].textContent.split("").splice(1, 15).join(""));
        let one_cart_max_price = +(price_quantity_div.childNodes[1].childNodes[3].textContent.split("").splice(1, 15).join(""));
        let quantity = +(price_quantity_div.childNodes[3].childNodes[3].textContent);
        subtotal += (one_cart_price * quantity);
        max_Price += (one_cart_max_price * quantity);
    }
    cart_subtotal.innerHTML = `₹${subtotal}.00`
    cart_total_discount.innerHTML = `₹${Math.floor(max_Price - subtotal)}.01`
    if (subtotal >= 399) {
        discount_above_399.innerHTML = "Congratulations, Your delivery charge is waived off!!!";
        cart_delivery_charge.innerHTML = `₹0.00`;
        total_payable_amount_cart.innerHTML = `Total: ₹${subtotal}.00`
        total_bill_cart.innerHTML = `₹${subtotal}.00`
    } else {
        discount_above_399.innerHTML = "Your cart value is less than ₹399 & delivery charge applies";
        cart_delivery_charge.innerHTML = `₹39.00`
        total_payable_amount_cart.innerHTML = `Total: ₹${subtotal + 39}.00`
        total_bill_cart.innerHTML = `₹${subtotal + 39}.00`
    }
    proceed_to_checkout_btn.style.backgroundColor = "#D11243";
    proceed_to_checkout_btn.style.color = "white";
    proceed_to_checkout_btn.addEventListener("click", gotoAddressPage)
}

proceed_to_checkout_btn.addEventListener("click", gotoAddressPage)
function gotoAddressPage() {
    console.log("Aao le chalu tumhe agey ki aur");
    closeCart()
}