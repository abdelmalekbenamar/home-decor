const productsPerPage = 12;
let currentPage = 1;
let allProducts = [];
let filteredProducts = [];

const shopProductsGrid = document.getElementById("shopProductsGrid");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const currentPageSpan = document.getElementById("currentPage");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const catOp = document.getElementById("catOp");
const priceDropdown = document.getElementById("priceFilter");

// Event listener for price filtering
priceDropdown.addEventListener("change", () => {
    const selectedPriceRange = priceDropdown.value;
    filterByPrice(selectedPriceRange);
});

// Fetch products from the API
async function getProducts() {
    try {
        const response = await fetch("https://decor.codia-dev.com/products.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Convert "prix" to numbers to avoid issues during filtering
        allProducts = data.products.map(product => ({
            ...product,
            prix: parseFloat(product.prix),
        }));
        filteredProducts = [...allProducts];

        displayProducts(currentPage);
        updatePaginationButtons(filteredProducts.length);
        displayFeaturedProducts();
    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        shopProductsGrid.innerHTML = `<p class="text-red-500">Impossible de charger les produits. Veuillez réessayer plus tard.</p>`;
    }
}

// Display products on the current page
function displayProducts(page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);

    shopProductsGrid.innerHTML = "";

    if (paginatedProducts.length === 0) {
        shopProductsGrid.innerHTML = `<p class="text-gray-500">Aucun produit trouvé.</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    paginatedProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "border border-black rounded-lg overflow-hidden shadow-lg bg-white";
        productCard.innerHTML = `
            <img src="${product.img1}" alt="${product.title}" class="w-full h-32 object-contain md:h-48">
            <div class="px-4 pt-4 flex justify-between">
                <h3 class="text-sm font-bold md:text-lg">${product.title}</h3>  
                <button class="heart-icon"><i class="ri-heart-line text-sm md:text-xl"></i></button>
            </div>
            <p class="text-gray-400 text-xs uppercase px-4 underline md:text-sm">${product.category}</p>
            <div class="p-4 flex justify-start justify-between flex-col md:flex-row">
                <p class="text-black font-bold text-sm md:text-lg md:mt-2">$${product.prix}</p>
                <button id="btn-add" class="add-to-cart-btn bg-yellow-500 py-1 px-4 rounded-lg font-semibold mt-2" data-id="${product.id}">Add to cart</button>
            </div>`;
        fragment.appendChild(productCard);
    
        // Attach the heart icon click event
        const heartButton = productCard.querySelector(".heart-icon i");
        heartButton.addEventListener("click", () => toggleHeart(product));
    });
    
    shopProductsGrid.appendChild(fragment);

    document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
        btn.addEventListener("click", () =>
            addToCart(parseInt(btn.getAttribute("data-id")))
        );
    });
}

// Update pagination buttons
function updatePaginationButtons(totalProducts = filteredProducts.length) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    currentPageSpan.textContent = currentPage;
}

// Pagination controls
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
        updatePaginationButtons();
        window.scrollTo({ top: 200, behavior: "smooth" });
    }
});

nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts(currentPage);
        updatePaginationButtons();
        window.scrollTo({ top: 200, behavior: "smooth" });
    }
});

// Category filtering
catOp.addEventListener("change", () => {
    const selectedCategory = catOp.value.toLowerCase();
    filteredProducts = !selectedCategory
        ? [...allProducts]
        : allProducts.filter((product) =>
            product.category.toLowerCase() === selectedCategory
        );
    currentPage = 1;
    displayProducts(currentPage);
    updatePaginationButtons();
});

// Search functionality
searchButton.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase().trim();
    filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    currentPage = 1;
    displayProducts(currentPage);
    updatePaginationButtons();
});

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

// Price filtering
function filterByPrice(priceRange) {
    if (!priceRange) {
        filteredProducts = [...allProducts];
    } else {
        switch (priceRange) {
            case "1":
                filteredProducts = allProducts.filter((product) => product.prix >= 0 && product.prix <= 500);
                break;
            case "2":
                filteredProducts = allProducts.filter((product) => product.prix > 500 && product.prix <= 1000);
                break;
            case "3":
                filteredProducts = allProducts.filter((product) => product.prix > 1000);
                break;
            default:
                filteredProducts = [...allProducts];
                break;
        }
    }
    currentPage = 1;
    displayProducts(currentPage);
    updatePaginationButtons();
}

// Display featured products
function displayFeaturedProducts() {
    const slider = document.getElementById("newSlider");
    slider.innerHTML = "";
    const featuredProducts = allProducts.slice(0, 8);

    featuredProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "min-w-[200px] border border-black rounded-lg overflow-hidden shadow-lg bg-white p-4";
        productCard.innerHTML = `
            <img src="${product.img1}" alt="${product.title}" class="w-full h-48 object-cover">
            <div class="flex justify-between mt-2">
                <h3 class="text-lg font-bold">${product.title}</h3>  
                <button><i class="ri-heart-line text-xl"></i></button>
            </div>
            <p class="text-gray-400 text-xs uppercase px-2 underline md:text-sm">${product.category}</p>
            <div class="p-2 flex items-center justify-between flex-col md:flex-row">
                <p class="text-black font-bold text-sm md:text-lg">$${product.prix}</p>
                <button id="btn-add" class="add-to-cart-btn bg-yellow-500 py-1 px-4 rounded-lg font-semibold mt-2" data-id="${product.id}">Add to cart</button>
            </div>`;
        slider.appendChild(productCard);
    });
}

//heart action
function toggleHeart(product) {
    const heartIcon = event.target; // Target the heart icon clicked

    let favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];

    if (heartIcon.classList.contains("ri-heart-line")) {
        // Add to favorites
        heartIcon.classList.remove("ri-heart-line");
        heartIcon.classList.add("ri-heart-fill");
        favoriteProducts.push(product);
    } else {
        // Remove from favorites
        heartIcon.classList.remove("ri-heart-fill");
        heartIcon.classList.add("ri-heart-line");
        favoriteProducts = favoriteProducts.filter((p) => p.id !== product.id);
    }

    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
}


// Initialize
getProducts();
