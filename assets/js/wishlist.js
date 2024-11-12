const carte = document.querySelectorAll("#carte");
const cartes = document.getElementById("cartes");
const counter = document.getElementById("counter");

// btn
const addAllToCarte = document.getElementById("add-all-to-cart");
const addToCarte = document.querySelectorAll("#add-to-card");
const removeFromWishlist = document.querySelectorAll("#remove-from-wishlist");

// remove carte
for(let i=0; i<carte.length; i++){
    removeFromWishlist[i].addEventListener("click", ()=>{
        carte[i].classList.add("hidden");
    });
}