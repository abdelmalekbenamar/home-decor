const productsPerPage = 12;
let currentPage = 1;
let allProducts = [];

const shopProductsGrid = document.getElementById("shopProductsGrid");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const currentPageSpan = document.getElementById("currentPage");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Récupérer les produits depuis l'API
async function getProducts() {
    try {
        const response = await fetch("https://decor.codia-dev.com/products.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        allProducts = data.products;
        displayProducts(currentPage);
        updatePaginationButtons();
        displayFeaturedProducts();
    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        shopProductsGrid.innerHTML = `<p class="text-red-500">Impossible de charger les produits. Veuillez réessayer plus tard.</p>`;
    }
}

// Afficher les produits pour la page actuelle
function displayProducts(page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = allProducts.slice(start, end);

    shopProductsGrid.innerHTML = ""; 

    const fragment = document.createDocumentFragment();
    paginatedProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "border border-black rounded-lg overflow-hidden shadow-lg bg-white";
        productCard.innerHTML = `
            <img src="${product.img1}" alt="${product.title}" class="w-full h-32 object-contain md:h-48">
            <div class="px-4 pt-4 flex justify-between">
                <h3 class="text-sm font-bold md:text-lg">${product.title}</h3>  
                <i class="ri-heart-line text-sm md:text-xl"></i>
            </div>
            <p class="text-gray-400 text-xs uppercase px-4 underline md:text-sm">${product.category}</p>
            <div class="p-4 flex justify-start justify-between flex-col md:flex-row">
                <p class="text-black font-bold text-sm md:text-lg md:mt-2">$${product.prix}</p>
                <button id="btn-add" class="add-to-cart-btn bg-yellow-500 py-1 px-4 rounded-lg font-semibold mt-2" data-id="${product.id}" >Add to cart</button>
            </div>`;
        fragment.appendChild(productCard);
    });
    shopProductsGrid.appendChild(fragment);
    document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
        btn.addEventListener("click", () =>
          addToCart(parseInt(btn.getAttribute("data-id")))
        );
      });
}


function updatePaginationButtons() {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    currentPageSpan.textContent = currentPage; 
}

// Gestion des clics sur les boutons de pagination
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
        updatePaginationButtons();
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }
});

nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts(currentPage);
        updatePaginationButtons();
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }
});

// Fonction de recherche
function searchProducts() {
    const query = searchInput.value.toLowerCase();
    if (query === "") {
        // Si l'input est vide, réinitialiser tous les produits
        getProducts();
    } else {
        // Sinon, filtrer les produits en fonction de la recherche
        const filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
        );
        allProducts = filteredProducts;
        currentPage = 1;
        displayProducts(currentPage);
        updatePaginationButtons();
    }
}


// Event listeners pour la recherche
searchButton.addEventListener("click", searchProducts);
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchProducts();
    }
});

// Afficher les produits mis en avant
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
                <i class="ri-heart-line text-xl"></i>
            </div>
            <p class="text-gray-400 text-xs uppercase px-2 underline md:text-sm">${product.category}</p>
            <div class="p-2 flex items-center justify-between flex-col md:flex-row">
                <p class="text-black font-bold text-sm md:text-lg">$${product.prix}</p>
                <button id="btn-add" class="add-to-cart-btn bg-yellow-500 py-1 px-4 rounded-lg font-semibold mt-2" data-id="${product.id}" >Add to cart</button>
            </div>`;
        slider.appendChild(productCard);
    });
}

// Initialisation
getProducts();
