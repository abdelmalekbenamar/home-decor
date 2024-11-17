// Function to display wishlist items
function displayWishlist() {
    const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    console.log("Favorite Products:", favoriteProducts); // Debug log

    const wishlistContainer = document.getElementById("wishlistContainer");
    wishlistContainer.innerHTML = ""; // Clear the wishlist container

    if (favoriteProducts.length === 0) {
        wishlistContainer.innerHTML = `<p>Your wishlist is empty</p>`;
        return;
    }

    favoriteProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "border border-black rounded-lg overflow-hidden shadow-lg bg-white";
        productCard.innerHTML = `
            <img src="${product.img1}" alt="${product.title}" class="w-full h-48 object-cover">
            <div class="px-3 lg:pt-8 flex justify-between lg:mt-6">
                <h3 class="lg:text-xl font-bold">${product.title}</h3> 
            </div>
            <p class="text-gray-400 lg:mt-2 uppercase px-4 underline">${product.category}</p>
            <div class="lg:p-4 p-3 flex lg:items-center justify-start lg:justify-between flex-col lg:flex-row">
                <p class="text-black font-bold mt-2 lg:text-xl">$${product.prix}</p>
            </div>
            <div class="flex gap-2 my-3 justify-evenly">
                <button class="bg-yellow-500 text-white py-1 px-3 rounded add-to-cart" data-id="${product.id}">Add to Cart</button>
                <button class="bg-red-500 text-white py-1 px-3 rounded remove-from-wishlist" data-id="${product.id}">Remove</button>
            </div>
        `;
        wishlistContainer.appendChild(productCard);

        // Add event listeners for the buttons
        productCard.querySelector(".add-to-cart").addEventListener("click", () => addToCart(product));
        productCard.querySelector(".remove-from-wishlist").addEventListener("click", () => removeFromWishlist(product.id));
    });
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", displayWishlist);


function addToCart(product) {
    console.log(`Adding product to cart: ${product.title}`);
}

function removeFromWishlist(productId) {
    console.log(`Removing product from wishlist: ${productId}`);
    const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    const updatedProducts = favoriteProducts.filter((product) => product.id !== productId);
    localStorage.setItem("favoriteProducts", JSON.stringify(updatedProducts));
    displayWishlist();
}

function addToWishlist(product) {
    let favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    const exists = favoriteProducts.some((item) => item.id === product.id); // Check for duplicates
    if (!exists) {
        favoriteProducts.push(product);
        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
    }
}

displayWishlist();


// Call the function when the page loads
document.addEventListener('DOMContentLoaded', displayWishlist);
