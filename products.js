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

    let image = document.createElement("img");
    let title = document.createElement("div");

    title.innerText = el.title;

    image.setAttribute("src", el.img1);
    let description = document.createElement("div");
    description.innerText = el.description.substring(0, 70);
    let div1 = document.createElement("div");
    let price = document.createElement("div");
    price.innerText = el.price;
    let btn = document.createElement("button");
    btn.innerText = "ADD TO CART";
    let deliveryDate = document.createElement("div");
    deliveryDate.innerText = "TOMORROW 6 AM-8 AM";
    div1.append(price, btn);
    div.append(image, title, description, div1, deliveryDate);
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
