

// ---------------------dom content loading function ------------------------------------------------------ 
document.addEventListener('DOMContentLoaded', () => {

//   --------------------- header variables ---------------------------------------------------------------- 
const  menu = document.querySelector('.menu');
const menuMain = menu.querySelector(".menu-main");
const goBack = menu.querySelector(".go-back");
const menuTrigger = document.querySelector(".mobile-menu-trigger");
const closeMenu = menu.querySelector(".mobile-menu-close");
const cartLengthSpan= document.getElementById("cart-length")
cartLengthSpan.style.display="none";

let subMenu;
menuMain.addEventListener("click", (e) =>{
   if(!menu.classList.contains("active")){
      return;
   }
  if(e.target.closest(".menu-item-has-children")){
      const hasChildren = e.target.closest(".menu-item-has-children");
     showSubMenu(hasChildren);
  }
});
goBack.addEventListener("click",() =>{
    hideSubMenu();
})
menuTrigger.addEventListener("click",() =>{
    toggleMenu();
})
closeMenu.addEventListener("click",() =>{
    toggleMenu();
})
document.querySelector(".menu-overlay").addEventListener("click",() =>{
   toggleMenu();
})


function toggleMenu(){
   menu.classList.toggle("active");
   document.querySelector(".menu-overlay").classList.toggle("active");
}
// --------------------show sub menu function -------------------------------------------------------- 

function showSubMenu(hasChildren){
   subMenu = hasChildren.querySelector(".sub-menu");
   subMenu.classList.add("active");
   subMenu.style.animation = "slideLeft 0.5s ease forwards";
   const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
   menu.querySelector(".current-menu-title").innerHTML=menuTitle;
   menu.querySelector(".mobile-menu-head").classList.add("active");
}

// --------------------hide sub menu function -------------------------------------------------------- 

function  hideSubMenu(){  
   subMenu.style.animation = "slideRight 0.5s ease forwards";
   setTimeout(() =>{
      subMenu.classList.remove("active");	
   },300); 
   menu.querySelector(".current-menu-title").innerHTML="";
   menu.querySelector(".mobile-menu-head").classList.remove("active");
}

window.onresize = function(){
   if(this.innerWidth >991){
      if(menu.classList.contains("active")){
         toggleMenu();
      }

   }
}


// -------------------------------------------------------------------------
// storing sub-category ( gender & sub-category) value in localStorage 
// --------------------------------------------------------------------------

let T_Shirts_men=document.getElementById("T-Shirts-men");
T_Shirts_men.addEventListener("click", ()=>{
   localStorage.setItem("gender","male");
   localStorage.setItem("category","T-shirt");

})
let Shirts_men=document.getElementById("Shirts-men");
Shirts_men.addEventListener("click", ()=>{
   localStorage.setItem("gender","male");
   localStorage.setItem("category","Shirt");

})


// ======================= small display search animation ========================================= 

// ---- ---- Const ---- ---- //
let imgDiv=document.getElementById("img-div");
let hambergur= document.querySelector(".mobile-menu-trigger")
let iconDivs=document.querySelectorAll(".icon-div"),
iconBagDiv = document.querySelector('.icon-bag-div'),
inputBox = document.querySelector('.input-box'),
searchIcon = document.querySelector('.search'),
closeIcon = document.querySelector('.close-icon');

// ---- ---- Open Input ---- ---- //
searchIcon.addEventListener('click', () => {
inputBox.classList.add('open');

imgDiv.style.display="none";
menu.style.display="none";
for (let i = 0; i < iconDivs.length; i++) {
  iconDivs[i].style.display = "none";
}
iconBagDiv.style.display="none";

hambergur.style.display="none";
});

// ---- ---- Close Input ---- ---- //
closeIcon.addEventListener('click', () => {
inputBox.classList.remove('open');
imgDiv.style.display="block"
menu.style.display="block";

// iconDiv.style.display="block"
for (let i = 0; i < iconDivs.length; i++) {
  iconDivs[i].style.display = "block";
}
iconBagDiv.style.display="block";
hambergur.style.display="flex";

});

// --------------------------------function for total cart length -----------------------------------------------------

async function caertLengthFun(){
   let cartRes= await fetch("https://excited-deer-headscarf.cyclic.app/cart",{
      method: "GET",
      headers: {
        "Content-Type":"application/json",

      //   Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmI0ZWI4Y2QxM2E5MTRkNDUyYWE0MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgwODgyMTQ1fQ.rn6XqYYzbJNZdntXuiz3covOaFB_1MRDw2feEILfHMw",
        Authorization: localStorage.getItem("token"),
      },

   })

   if(cartRes.ok){
   let data= await cartRes.json();
         console.log(data)
         cartLengthSpan.style.display="block";

         cartLengthSpan.innerHTML=data.length;
      }
}

caertLengthFun()

 });