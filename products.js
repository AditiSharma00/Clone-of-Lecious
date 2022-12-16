let data1;
let product_data;
async function getData() {
  try {
    let res = await fetch(
      "https://63982e64044fa481d693d25f.mockapi.io/products"
    );
    product_data = await res.json();
    console.log(product_data);
    displayProduct(product_data);
  } catch (error) {
    console.log(error);
  }
}
window.onload = () => {
  getData();
};
function displayProduct(data) {
  let products = document.getElementById("product");
  products.innerHTML = "";
  data.forEach((el) => {
    let div = document.createElement("div");
    div.addEventListener("click", function () {
      data1 = el.id;
      window.open("", "_self");
      localStorage.setItem("currentProduct", data1);
    });
    div.id = "product_div";

    let image = document.createElement("img");
    image.id = "product_image";
    let div2 = document.createElement("div");
    div2.id = "second_div";
    let title = document.createElement("p");

    title.innerText = el.title;
    title.id = "product_title";

    image.setAttribute("src", el.img1);
    let description = document.createElement("p");
    description.id = "product_description";
    description.innerText = el.description.substring(0, 70);
    let div1 = document.createElement("div");
    div1.id = "product_price_cart";
    let price = document.createElement("p");
    price.innerText = el.price;
    price.id = "product_price";
    let btn = document.createElement("button");
    btn.innerText = "ADD TO CART";
    btn.id = "product_btn";
    let deliveryDate = document.createElement("div");
    deliveryDate.innerText = "TOMORROW 6 AM-8 AM";
    deliveryDate.id = "product_delivery";
    div1.append(price, btn);
    div2.append(title, description, div1);
    div.append(image, div2, deliveryDate);
    products.append(div);
  });
}
let btn = document.getElementById("highToLow");
btn.addEventListener("click", function () {
  product_data.sort(function (a, b) {
    {
      {
        return b.price - a.price;
      }
    }
  });
  displayProduct(product_data);
});
let btn1 = document.getElementById("lowToHigh");
btn1.addEventListener("click", function () {
  product_data.sort(function (a, b) {
    {
      {
        return a.price - b.price;
      }
    }
  });
  displayProduct(product_data);
});
