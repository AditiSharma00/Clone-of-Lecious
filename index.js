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

// let bottom_navbar=document.querySelector("#bottom-navbar");

// window.onscroll=function stickyFun(){

//   bottom_navbar.setAttribute("class","sticky")
//   console.log("hellow")
// }
