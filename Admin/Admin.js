let admin_orders_main_body = document.querySelector("#admin_orders_main_body");
let admin_users_main_body = document.querySelector("#admin_users_main_body");
let admin_products_main_body = document.querySelector("#admin_products_main_body");
let admin_add_products_main_body = document.querySelector("#admin_add_products_main_body");
let all_orders_option = document.querySelector("#all_orders_option"); all_orders_option
let all_users_option = document.querySelector("#all_users_option"); all_orders_option
let all_products_option = document.querySelector("#all_products_option"); all_orders_option
let add_products_option = document.querySelector("#add_products_option"); all_orders_option

function showAllOrders() {
    admin_orders_main_body.style.display = "flex";

    admin_users_main_body.style.display = "none";
    admin_products_main_body.style.display = "none";
    admin_add_products_main_body.style.display = "none";


    all_orders_option.style.paddingBottom = "4px";

    all_users_option.removeAttribute('style')
    all_products_option.removeAttribute('style')
    add_products_option.removeAttribute('style')
    AllOdersSection()
}
function showAllUsers() {
    admin_users_main_body.style.display = "flex";

    admin_orders_main_body.style.display = "none";
    admin_products_main_body.style.display = "none";
    admin_add_products_main_body.style.display = "none";

    all_users_option.style.paddingBottom = "4px";

    all_orders_option.removeAttribute('style')
    all_products_option.removeAttribute('style')
    add_products_option.removeAttribute('style')
    AllUsersSection()
}
function showAllProducts() {
    admin_products_main_body.style.display = "flex";

    admin_users_main_body.style.display = "none";
    admin_orders_main_body.style.display = "none";
    admin_add_products_main_body.style.display = "none";

    all_products_option.style.paddingBottom = "4px";

    all_orders_option.removeAttribute('style')
    all_users_option.removeAttribute('style')
    add_products_option.removeAttribute('style')
    AllProductSection();
}
function showAddProductSec() {
    admin_add_products_main_body.style.display = "flex";

    admin_users_main_body.style.display = "none";
    admin_orders_main_body.style.display = "none";
    admin_products_main_body.style.display = "none";

    add_products_option.style.paddingBottom = "4px";

    all_orders_option.removeAttribute('style')
    all_users_option.removeAttribute('style')
    all_products_option.removeAttribute('style')
}


// All Orders Section
AllOdersSection()
// called at nav options
let all_orders_detail_arr;
let all_users_details_arr;
let all_product_details_arr;
async function AllOdersSection() {
    all_orders_detail_arr = await (await fetch("https://63982e64044fa481d693d25f.mockapi.io/total_orders")).json()
    all_users_details_arr = await (await fetch("https://63982e64044fa481d693d25f.mockapi.io/users")).json();
    all_product_details_arr = await (await fetch("https://63982e64044fa481d693d25f.mockapi.io/products")).json();


    let all_orders_list = document.querySelector("#all_orders_list");
    let orderListHTMLarr = [];
    for (let i = 0; i < all_orders_detail_arr.length; i++) {
        let indi_order = all_orders_detail_arr[i]
        let user_info_promise = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/users/${indi_order.user_id}`);
        let user_info = user_info_promise.json();

        let ordered_products_html_arr = [];
        for (let j = 0; j < indi_order.total_order.length; j++) {
            let id_n_quan = indi_order.total_order[j];
            ordered_products_html_arr.push(
                `
                <tr>
                    <td>${id_n_quan[0]}</td>
                    <td>${all_product_details_arr[id_n_quan[0] - 1].title}</td>
                    <td>${id_n_quan[1]}</td>
                    <td>₹${(all_product_details_arr[id_n_quan[0] - 1].price) * id_n_quan[1]}</td>
                </tr>
                `
            )
        }
        let user_index;
        for (let x = 0; x < all_users_details_arr.length; x++) {
            if (indi_order.user_id == all_users_details_arr[x].id) {
                user_index = x;
                break
            }
        }
        // console.log(all_users_details_arr[user_index].phone_number)
        orderListHTMLarr.push(
            `
                <div class="one_order_list_card">
                    <div class="order_short_info">
                        <span>
                            <svg>
                                <path
                                    d="M10.5657 7.43431C10.2533 7.12189 9.74673 7.12189 9.43431 7.43431C9.1219 7.74673 9.1219 8.25327 9.43431 8.56569L10.5657 7.43431ZM14 12L14.5657 12.5657C14.8781 12.2533 14.8781 11.7467 14.5657 11.4343L14 12ZM9.43431 15.4343C9.12189 15.7467 9.12189 16.2533 9.43431 16.5657C9.74673 16.8781 10.2533 16.8781 10.5657 16.5657L9.43431 15.4343ZM9.43431 8.56569L13.4343 12.5657L14.5657 11.4343L10.5657 7.43431L9.43431 8.56569ZM13.4343 11.4343L9.43431 15.4343L10.5657 16.5657L14.5657 12.5657L13.4343 11.4343Z">
                                </path>
                            </svg>
                            <span>${indi_order.id}</span>
                        </span>
                        <span>${indi_order.user_id}</span>
                        <span>${indi_order.total_order.length}</span>
                        <span>${all_users_details_arr[user_index].phone_number}</span>
                        <span onclick=${indi_order.status == "pending" ? "proceedToDelivery()" : "orderCompleted()"} data-id = ${indi_order.id}>${indi_order.status == "pending" ? "Confirm" : "Mark As Delivered"}</span>
                    </div>
                    <div class="order_detailed_info">
                        <div class="all_ordered_item_name_list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Pricing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${ordered_products_html_arr.join(" ")
            }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colspan="3">Total Amount</th>
                                        <th>₹${indi_order.total_Amount}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            `
        )
    }
    all_orders_list.innerHTML = orderListHTMLarr.join(" ")
}
async function proceedToDelivery() {
    let id = event.target.dataset.id;
    let updated_order_status_obj = all_orders_detail_arr.indexOf(all_orders_detail_arr);
    for (let i = 0; i < all_orders_detail_arr.length; i++) {
        if (all_orders_detail_arr[i].id == id) {
            updated_order_status_obj = all_orders_detail_arr[i]
            break;
        }
    }
    updated_order_status_obj.status = "confirmed";
    event.target.innerText = "Mark As Delivered"
    removeEventListener("click", proceedToDelivery);
    event.target.addEventListener("click", orderCompleted);
    await fetch(`https://63982e64044fa481d693d25f.mockapi.io/total_orders/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updated_order_status_obj),
    })
}
async function orderCompleted() {
    event.target.parentElement.nextElement
    event.path[2].innerHTML = null;
    let a = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/total_orders/${event.target.dataset.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
}




// All Users.............................
let all_orders_detail_arr2;
let all_users_details_arr2;
let all_product_details_arr2;

//called at nav options
async function AllUsersSection() {
    all_orders_detail_arr2 = await (await fetch("https://63982e64044fa481d693d25f.mockapi.io/total_orders")).json()
    all_users_details_arr2 = await (await fetch("https://63982e64044fa481d693d25f.mockapi.io/users")).json();
    all_product_details_arr2 = await (await fetch("https://63982e64044fa481d693d25f.mockapi.io/products")).json();

    let all_users_list = document.querySelector("#all_users_list");
    let all_users_HTML_arr = [];
    for (let i = 0; i < all_users_details_arr.length; i++) {
        let indi_user = all_users_details_arr[i];
        // console.log(indi_user)

        let cart_item_html_arr = [];
        for (let j = 0; j < indi_user.cart.length; j++) {
            let id_n_quan = indi_user.cart[j];
            cart_item_html_arr.push(
                `
                <tr>
                    <td>${id_n_quan[0]}</td>
                    <td>${all_product_details_arr2[id_n_quan[0] - 1].title}</td>
                    <td>${id_n_quan[1]}</td>
                    <td>₹${(all_product_details_arr2[id_n_quan[0] - 1].price) * id_n_quan[1]}</td>
                </tr>
                `
            )
        }

        all_users_HTML_arr.push(
            `
                <div class="one_user_list_card">
                    <div class="user_short_info">
                        <span>${indi_user.id}</span>
                        <span>${indi_user.username}</span>
                        <span>${indi_user.phone_number}</span>
                        <span>${indi_user.address["location"] ? [indi_user.address.location,indi_user.address["flat-no"],indi_user.address.landmark, indi_user.address.city, indi_user.address.phone_number].join(" ") : "No address saved"}</span>
                        <span onclick="deleteUserFunc()" data-id=${indi_user.id}>Delete</span>
                    </div>
                    <div class="user_detailed_info">
                        <div class="all_users_name_list">
                            <table>
                                <tbody>
                                    <tr>
                                        <th style="text-align: center; position: relative;" rowspan="10">
                                            <div>
                                                <img style="margin: 20px auto;" src="Admin%20images/profile_icon_2.svg"
                                                    alt="">
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>User ID</th>
                                        <td>${indi_user.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Username</th>
                                        <td>${indi_user.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>${indi_user.address[0] || "wahi kahi jaha koi aata jata nahi"}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>${indi_user.phone_number}</td>
                                    </tr>
                                    <tr>
                                        <th rowspan="auto">Cart</th>
                                        <td>
                                            <span>
                                                <table id="admin_allUsers_cart">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Qty.</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                    ${cart_item_html_arr.join(" ")}
                                                </table>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `
        )
    };
    all_users_list.innerHTML = all_users_HTML_arr.join(" ");
    // console.log(all_users_HTML_arr.join(" "))
}
async function deleteUserFunc() {
    let card = event.path[2]
    event.path[2].style.backgroundColor = "#d1124236";
    setTimeout(() => {
        card.remove()
    }, 250);
    let user_id = event.target.dataset.id;
    await fetch(`https://63982e64044fa481d693d25f.mockapi.io/users/${user_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    let deleted_user_order;
    for (let i = 0; i < all_orders_detail_arr2.length; i++) {
        if (user_id == all_orders_detail_arr2[i].user_id) {
            deleted_user_order = all_orders_detail_arr2[i].id;
        }
    }
    await fetch(`https://63982e64044fa481d693d25f.mockapi.io/total_orders/${deleted_user_order}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
}









// All Products Section

let product_table = document.querySelector("#product_table");
function scroll_rigth_products() {
    product_table.scrollBy({
        top: 0,
        left: 270,
        behavior: "smooth"
    })
}
function scroll_left_products() {
    product_table.scrollBy({
        top: 0,
        left: -270,
        behavior: "smooth"
    })
}


let all_product_details_arr3;
async function AllProductSection() {
    all_product_details_arr3 = await (await fetch("https://63982e64044fa481d693d25f.mockapi.io/products")).json();

    let product_table = document.querySelector("#product_table");
    let all_product_card_HTML = [];

    for (let i = 0; i < all_product_details_arr3.length; i++) {
        let indi_product = all_product_details_arr3[i];

        all_product_card_HTML.push(
            `
            <div class="one_product_card_at_admin">
                <div>
                    <img src=${indi_product.img1}
                        alt="">
                </div>
                <div>
                    <span>Category</span>
                    <input data-key="category" type="text" placeholder="Enter Category" value="${indi_product.category}" readonly>
                </div>
                <div>
                    <span>Name</span>
                    <input data-key="title" type="text" placeholder="Enter Product Name" value="${indi_product.title}" readonly>
                </div>
                <div>
                    <span>Description</span>
                    <textarea data-key="description" cols="30" placeholder="Enter Product Description" rows="5" readonly>${indi_product.description}</textarea>
                </div>
                <div>
                    <span>Rate</span>
                    <input data-key="price" type="number" placeholder="Enter Product Rate" value="${indi_product.price}" readonly>
                </div>
                <div>
                    <span>Max-Rate</span>
                    <input data-key="maxPrice" type="number" placeholder="Enter Max-Rate of Product" value="${indi_product.maxPrice}" readonly>
                </div>
                <div>
                    <span>Stocks</span>
                    <input data-key="stock" type="number" placeholder="Enter Stocks" value="${indi_product.stock}" readonly>
                </div>
                <div>
                    <span>Image1</span>
                    <input data-key="img1" type="url" placeholder="Main Image URL"
                        value="${indi_product.img1}"
                        readonly>
                </div>
                <div>
                    <span>Image2</span>
                    <input data-key="img2" type="url" placeholder="2nd Image URL"
                        value="${indi_product.img2}"
                        readonly>
                </div>
                <div>
                    <span>Image3</span>
                    <input data-key="img3" type="url" placeholder="3rd Image URL"
                        value="${indi_product.img3}"
                        readonly>
                </div>
                <div>
                    <button data-id = "${indi_product.id}" onclick="editProduct()">EDIT</button>
                    <button data-id = "${indi_product.id}" onclick="deleteProduct()">DELETE</button>
                </div>
            </div>
            `
        )
    }
    product_table.innerHTML = all_product_card_HTML.join(" ")
}

async function editProduct() {
    for (let i = 1; i < event.path[2].children.length - 1; i++) {
        event.path[2].children[i].children[1].removeAttribute("readonly")
        event.path[2].children[i].children[1].style.backgroundColor = "#f7f7f7"
    }
    event.path[2].children[2].children[1].focus();
    event.target.innerText = "SAVE";
    event.target.style.color = "#D11243"
    event.target.style.backgroundColor = "white"
    event.target.style.border = "2px solid #D11243"
    event.target.removeEventListener("click", editProduct);
    event.target.addEventListener("click", putUpdatedProduct)
}
async function putUpdatedProduct() {
    let card = event.path[2];
    let updatedCard = {};
    let allKeys = ['category', 'title', 'description', 'price', 'maxPrice', 'img1', 'img2', 'img3', 'stock', 'discount']
    for (let i = 1; i < allKeys.length - 1; i++) {
        updatedCard[event.path[2].children[i].children[1].dataset.key] = event.path[2].children[i].children[1].value
        // console.log(event.path[2].children[i].children[1].value)
        event.path[2].children[i].children[1].setAttribute("readonly", "true")
        event.path[2].children[i].children[1].style.backgroundColor = "#ffffff"
    }
    updatedCard.discount = Math.floor((Number(updatedCard.maxPrice) - Number(updatedCard.price)) / (Number(updatedCard.maxPrice) / 100))
    event.path[2].children[0].children[0].setAttribute("src", updatedCard.img1)
    event.target.innerText = "EDIT";
    event.target.style.color = "white"
    event.target.style.backgroundColor = "#D11243"
    event.target.style.border = "0px solid #D11243"
    event.target.removeEventListener("click", putUpdatedProduct);
    event.target.addEventListener("click", editProduct);
    card.style.backgroundColor = "#427a012e";
    setTimeout(() => {
        card.style.backgroundColor = "#ffffff";
    }, 250);

    let product_id = event.target.dataset.id;
    await fetch(`https://63982e64044fa481d693d25f.mockapi.io/products/${product_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCard),
    })
}

async function deleteProduct() {
    let product_id = event.target.dataset.id;
    let card = event.path[2];
    card.style.backgroundColor = "#d1124236";
    setTimeout(() => {
        card.style.width = "0px";
        setTimeout(() => {
            card.remove();
        }, 100);
    }, 250);
    await fetch(`https://63982e64044fa481d693d25f.mockapi.io/products/${product_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
}









let newCard = {};
async function previewNewProductCard() {
    let ifPass = true;
    let card = event.path[2];
    let allKeys = ['category', 'title', 'description', 'price', 'maxPrice', 'img1', 'img2', 'img3', 'stock', 'discount']
    for (let i = 0; i < allKeys.length - 1; i++) {
        newCard[event.path[2].children[i].children[1].dataset.key] = event.path[2].children[i].children[1].value
        if (event.path[2].children[i].children[1].value == "") {
            ifPass = false;
            event.path[2].children[i].children[1].style.backgroundColor = "#d1124236";
            let an_input = event.path[2].children[i].children[1];
            setTimeout(() => {
                an_input.style.backgroundColor = "#ffffff";
            }, 3000)
        } else {
            ifPass = true;
            event.path[2].children[i].children[1].style.backgroundColor = "#ffffff";
        }
        // event.path[2].children[i].children[1].value = ""
    }
    newCard.discount = Math.floor((Number(newCard.maxPrice) - Number(newCard.price)) / (Number(newCard.maxPrice) / 100))

    //preview sec
    let new_card_img_preview = document.querySelector("#new_product_img_preview");
    let new_product_name_preview = document.querySelector("#new_product_name_preview");
    let new_product_des_preview = document.querySelector("#new_product_des_preview");
    let preview_price = document.querySelector(".preview_price");
    let preview_mrp = document.querySelector(".preview_mrp");
    let preview_discount = document.querySelector(".preview_discount");
    let view_new_card_preview = document.querySelector("#view_new_card_preview");
    let not_adding_state = document.querySelector("#not_adding_state");

    not_adding_state.style.display = "none"
    view_new_card_preview.style.display = "flex"
    new_card_img_preview.setAttribute("src", newCard.img1)
    new_product_name_preview.innerHTML = newCard.title || "No Title";
    new_product_des_preview.innerHTML = `${newCard.description || "No Description"}`;
    preview_price.innerHTML = `₹${newCard.price || "0.00"}`;
    preview_mrp.innerHTML = `₹${newCard.maxPrice || "0.00"}`;
    preview_discount.innerHTML = `${newCard.discount || "0"}% OFF`;

    if (ifPass) {
        let add_btn = document.querySelector("#addProductButtonAdmin");
        add_btn.style.display = "block"
        card.style.backgroundColor = "#31a6ff25";
        setTimeout(() => {
            card.style.backgroundColor = "#ffffff";
        }, 250);
    }
}

async function addNewProduct() {
    let card = event.path[2];
    for (let i = 0; i < event.path[2].children[i].length - 1; i++) {
        event.path[2].children[i].children[1].value = "";
    }
    card.style.backgroundColor = "#69beff1c";
    setTimeout(() => {
        card.style.backgroundColor = "#ffffff";
    }, 250);
    event.target.style.display = "none"
    await fetch(`https://63982e64044fa481d693d25f.mockapi.io/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
    });
    let view_new_card_preview = document.querySelector("#view_new_card_preview");
    let not_adding_state = document.querySelector("#not_adding_state");

    not_adding_state.style.display = "flex"
    view_new_card_preview.style.display = "none"
}