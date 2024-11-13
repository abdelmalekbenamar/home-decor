const carte = document.querySelectorAll("#carte");
const cartes = document.getElementById("cartes");
const counter = document.getElementById("counter");

// btn
const addAllToCarte = document.getElementById("add-all-to-cart");
const addToCarte = document.querySelectorAll("#add-to-card");
const removeFromWishlist = document.querySelectorAll("#remove-from-wishlist");

// arrays
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [] // || []: mean if the wishlist is umpty we get an array umpty []
// let getCarteFav = [];
// let carteFav = [];

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
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        displayWishlist();
    } else {
        alert(`${product.title} is already in your wichlist`);
    }
    console.log(addToWishlist());
}

function displayWishlist(){
    const wishlistContext = document.createElement("div");

    productCard.className = "flex flex-col rounded-md shadow-lg";
    productCard.innerHTML = `
      <div id="cartes" class="grid grid-cols-2  m-3 gap-2 md:grid-cols-3 lg:grid-cols-4">

                <div id="carte" class="flex flex-col rounded-md shadow-lg">
                    <div class="mx-auto"> <!--Image-->
                        <img src="${product.id}" alt="#">
                    </div>
                    <div class="px-2">
                        <span class="flex justify-around my-3"> <!--Title-->
                            <b>Curve</b>
                            <p>4.5 <i class="fa-solid fa-star" style="color: #FFD43B;"></i></p>
                        </span>
                        <p class="text-sm text-center opacity-60">Chairs</p>
                        <div class="m-3 flex flex-col"> <!--Index-->
                            <p class="text-blue-700"></p>
                            <p class="text-amber-600 self-center">319.99$</p>
                        </div>
                        <div class="flex justify-evenly my-3 flex-wrap"> <!--Btn-->
                            <button onclick="addToCart()"
                                class="bg-amber-500 hover:bg-yellow-700 rounded-2xl text-sm px-7 py-1 shadow-sm text-white box-border text-nowrap">Add
                                to cart</button>
                            <button id="remove-from-wishlist"><i class="fa-regular fa-trash-can" style="color: #6f6648 ;"></i></button>
                        </div>
                    </div>

                </div>
    `;
}



// remove carte
// for(let i=0; i<carte.length; i++){
//     removeFromWishlist[i].addEventListener("click", ()=>{
//         carte[i].classList.add("hidden");
//     });
// }