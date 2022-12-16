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
// let url ="https://63982e64044fa481d693d25f.mockapi.io/products";
// async function getData(){
//   try {
//     let res = await fetch(url);
//     let out = await res.json();
//     display(out)
//   } catch (error) {
//     console.log(error);
//   }
// }
// getData();

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