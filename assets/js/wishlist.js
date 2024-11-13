const carte = document.querySelectorAll("#carte");
const cartes = document.getElementById("cartes");
const counter = document.getElementById("counter");

// btn
const addAllToCarte = document.getElementById("add-all-to-cart");
const addToCarte = document.querySelectorAll("#add-to-card");
const removeFromWishlist = document.querySelectorAll("#remove-from-wishlist");

// arrays
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [] // || []: mean if the wishlist is umpty we get an array umpty []
let getCarteFav = [];
let carteFav = [];

function checkCarte(product){
    for(let info of wishlist){
        if(item.id === product.id){
            return true;
        }else{
            return false;
        }
    }
}

function addToWishlist(product){
    if(!checkCarte(product)){ //that mean the products isn't in wishlist
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
}



// remove carte
for(let i=0; i<carte.length; i++){
    removeFromWishlist[i].addEventListener("click", ()=>{
        carte[i].classList.add("hidden");
    });
}