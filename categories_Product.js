let what = document.querySelector("#src1");
let source = document.querySelector("#src2");
let source2 = document.querySelector(".source_2");
let line2 = document.querySelector(".line2");
let line1 = document.querySelector(".line1");
let part1 = document.querySelector("#part1 img");
let div1 = document.querySelector("#div1");
let div2 = document.querySelector("#div2");
let likes =document.querySelectorAll("#like3");
what.addEventListener("click",()=>{
    line1.style.borderBottomColor="rgb(219, 8, 124)";
    what.style.color="rgb(219, 8, 124)";
    source.style.color = "gray";
  line2.style.borderBottomColor = "white";
  part1.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1pyHwAtw0Ev-zRgPmZcoRtlcSCInK-TmHQ&usqp=CAU"
 
  div1.style.display = 'block';
    div2.style.display = 'none';
})

source.addEventListener("click",()=>{
   
  source.style.color = "rgb(219, 8, 124)";
  line2.style.borderBottomColor = "rgb(219, 8, 124)";
    line1.style.borderBottomColor="white";
    what.style.color="gray"
    part1.src = "https://s3-ap-southeast-1.amazonaws.com/licious/pdp/1555488868.3652--2019-04-1713:44:28--458"
   
    div1.style.display = 'none';
    div2.style.display = 'block';
   
})


let get =  JSON.parse(localStorage.getItem("currentProduct"));
async function addData(){
 try {
  let res = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/products/${get}`);
  let categories_data = await res.json();
  console.log(categories_data)
  let sliderimage1 = document.getElementById("img1");

sliderimage1.setAttribute("src",categories_data.img1);
let sliderimage2 = document.getElementById("img2");

sliderimage2.setAttribute("src",categories_data.img2);
let sliderimage3 = document.getElementById("img3");

sliderimage3.setAttribute("src",categories_data.img3);
let title = document.getElementById("title");
title.innerText = categories_data.title;
let des = document.getElementById("des");
des.innerText = categories_data.description;
let price = document.getElementById("price");
price.innerText = "MRP :"+categories_data.price;
let image1 = document.querySelector(".oval1")
let image2 = document.querySelector(".oval2")
let image3 = document.querySelector(".oval3")
image2.addEventListener("click",()=>{
  sliderimage1.style.display = 'none';
    sliderimage2.style.display = 'block';
    sliderimage3.style.display = 'none';
})
image3.addEventListener("click",()=>{
  sliderimage1.style.display = 'none';
    sliderimage2.style.display = 'none';
    sliderimage3.style.display = 'block';
})
image1.addEventListener("click",()=>{
  sliderimage1.style.display = 'block';
    sliderimage2.style.display = 'none';
    sliderimage3.style.display = 'none';
})
 } catch (error) {
  console.log(error)
 }

}
window.onload=()=>{
  addData()
}


let url ="https://63982e64044fa481d693d25f.mockapi.io/products";
async function getData(){
  try {
    let res = await fetch(url);
    let out = await res.json();
    display(out)
  } catch (error) {
    console.log(error);
  }
}
getData();


let data1;
async function display(data){
  data.forEach((el)=>{
    let addToCart = document.querySelector("#addToCart");
    addToCart.addEventListener("click", function () {
      data1 = el.id;
      console.log(data1);
      let current_user =
        JSON.parse(localStorage.getItem("current_user")) || null;
      if (current_user) {
        current_user.cart.push([data1, 1]);
        localStorage.setItem("current_user", JSON.stringify(current_user));
        addToCartFunc();
        async function addToCartFunc() {
          let a = await fetch(
            `https://63982e64044fa481d693d25f.mockapi.io/users/${current_user.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(current_user),
            }
          );
        }
      } else {
        //open login section
        console.log("Log In First");
      }
    })
    
  })
}





let left = document.querySelector("#left");
let right = document.querySelector("#right");
var count=0;
likes.forEach((slide,index)=>{
slide.style.left=`${index*100}%`
})
left.addEventListener("click",()=>{
  count--;
  slideImage()
})
right.addEventListener("click",()=>{
  count++;
  if(count==3){
    count--
  }
  slideImage()
})
const slideImage =()=>{
  likes.forEach((slide)=>{
    slide.style.transform =`translateX(-${count*100}%)`
  })
}