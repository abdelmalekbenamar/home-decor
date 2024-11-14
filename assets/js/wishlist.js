// // Get necessary elements
// const wishlist = []; // Array to store wishlist items
// const cart = []; // Array to store cart items
// const wishlistCounter = document.getElementById('counter');
// const wishlistContainer = document.getElementById('cartes');

// // Function to update the wishlist counter
// function updateWishlistCounter() {
//     wishlistCounter.innerText = `Total: ${wishlist.length}`;
// }

// // Function to render wishlist items
// function renderWishlist() {
//     wishlistContainer.innerHTML = ''; // Clear existing items
//     wishlist.forEach((item, index) => {
//         const itemElement = document.createElement('div');
//         itemElement.className = 'flex flex-col rounded-md shadow-lg';
//         itemElement.innerHTML = `
//             <div class="mx-auto"> 
//                 <img src="${item.image}" alt="${item.name}">
//             </div>
//             <div class="px-2">
//                 <span class="flex justify-around my-3"> 
//                     <b>${item.name}</b>
//                     <p>${item.rating} <i class="fa-solid fa-star" style="color: #FFD43B;"></i></p>
//                 </span>
//                 <p class="text-sm text-center opacity-60">${item.category}</p>
//                 <div class="m-3 flex flex-col"> 
//                     <p class="text-amber-600 self-center">${item.price}</p>
//                 </div>
//                 <div class="flex justify-evenly my-3 flex-wrap"> 
//                     <button onclick="addToCart(${index})"
//                         class="bg-amber-500 hover:bg-yellow-700 rounded-2xl text-sm px-7 py-1 shadow-sm text-white box-border text-nowrap">Add
//                         to cart</button>
//                     <button onclick="removeFromWishlist(${index})">
//                         <i class="fa-regular fa-trash-can" style="color: #6f6648 ;"></i>
//                     </button>
//                 </div>
//             </div>
//         `;
//         wishlistContainer.appendChild(itemElement);
//     });
// }

// // Function to add an item to the wishlist
// function addToWishlist(item) {
//     wishlist.push(item);
//     updateWishlistCounter();
//     renderWishlist();
// }

// // Function to remove an item from the wishlist
// function removeFromWishlist(index) {
//     wishlist.splice(index, 1);
//     updateWishlistCounter();
//     renderWishlist();
// }

// // Function to add an item to the cart
// function addToCart(index) {
//     const item = wishlist[index];
//     cart.push(item);
//     removeFromWishlist(index); // Remove from wishlist after adding to cart
// }

// // Function to add all items in wishlist to cart
// document.getElementById('add-all-to-cart').addEventListener('click', () => {
//     cart.push(...wishlist);
//     wishlist.length = 0; // Clear the wishlist
//     updateWishlistCounter();
//     renderWishlist();
// });

// // Sample data for testing purposes
// addToWishlist({ name: "Curve Chair", image: "../assets/imgs/F-N02.png", rating: 4.5, category: "Chairs", price: "$319.99" });
// addToWishlist({ name: "Can Sofa", image: "../assets/imgs/F-N03.png", rating: 4.5, category: "Sofas", price: "$2099.99" });















const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const productsPerPage = 12;
let currentPage = 1;
let allProductsFav = [];

const favProductsGrid = document.getElementById("favProductsGrid");

//test
function displayFavoriteProducts() {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = wishlist.slice(start, end);

    favProductsGrid.innerHTML = "";

    paginatedProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className =
            "border border-black rounded-lg overflow-hidden shadow-lg bg-white ";

        productCard.innerHTML = `
                                <img src="${product.img1}" alt="${product.title}" class="w-full h-32 object-cover md:h-48">
                                <div class="px-4 pt-4 flex justify-between">
                                    <h3 class="text-sm font-bold md:text-lg">${product.title}</h3>  
                                    <button id="remove-from-wishlist"><i class="fa-regular fa-trash-can" style="color: #6f6648 ;"></i></button>
                                </div>
                                <p class="text-gray-400 text-xs uppercase px-4 underline md:text-sm">${product.category}</p>
                                <div class="p-4 flex justify-between flex-col md:flex-row">
                                    <p class="text-black  font-bold text-sm md:text-lg md:mt-2">$${product.prix}</p>
                                    <button class="bg-yellow-500 py-1 px-3 rounded-md font-semibold text-xs md:text-base mt-2">Add to cart</button>
                                </div>`;
        
        favProductsGrid.appendChild(productCard);
        console.log(productCard);
        
    });
}

displayFavoriteProducts();