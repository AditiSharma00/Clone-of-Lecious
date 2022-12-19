let all_cat_sec = document.querySelector("#grid-1");
for(let i=0; i<all_cat_sec.children.length; i++){
  let cat = all_cat_sec.children[i]
    cat.addEventListener("click",()=>{
      window.location.href = "products.html"
    })
}



//collapsible js here

let pasted_here = document.querySelector("#pasted_here");
let hectic_one = document.querySelector("#hectic_one");

let ex = document.querySelector("#ex");
ex.addEventListener("click", uncollapsed);

let close = document.querySelector("#close");
close.addEventListener("click", uncollapsed);

let btn_02 = document.querySelector("#btn_02");
btn_02.addEventListener("click", collapsed);

function collapsed() {
  pasted_here.style.display = "none";
  hectic_one.style.display = "block";
}

function uncollapsed() {
  pasted_here.style.display = "block";
  hectic_one.style.display = "none";
}

// let slideshow = document.querySelector("#slideshow-1");
// slideshow.innerHTML = ` <img
// width="100%"
// src="https://d2407na1z3fc0t.cloudfront.net/Slider/banner_63630e9d6ba0e"
// alt="slideshow"
// />`;

// let count = 0;
// let ccc = setInterval(function () {
//   if (count % 2 == 0) {
//     slideshow.innerHTML = ` <img
// width="100%"
// src="https://d2407na1z3fc0t.cloudfront.net/Slider/banner_63617b4964e45"
// alt="slideshow"
// />`;
//   } else {
//     slideshow.innerHTML = ` <img
// width="100%"
// src="https://d2407na1z3fc0t.cloudfront.net/Slider/banner_63630e9d6ba0e"
// alt="slideshow"
// />`;
//   }

//   count++;
// }, 3000);
