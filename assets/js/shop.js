const productsPerPage = 12; 
let currentPage = 1;
let allProducts = [];

const shopProductsGrid = document.getElementById("shopProductsGrid");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const currentPageSpan = document.getElementById("currentPage");

// Récupérer les produits depuis l'API
async function getProducts() {
    const response = await fetch("https://decor.codia-dev.com/products.json");
    const data = await response.json();
    allProducts = data.products;
    displayProducts(currentPage);
    updatePaginationButtons();
}

// Afficher les produits pour la page actuelle
function displayProducts(page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = allProducts.slice(start, end);

    shopProductsGrid.innerHTML = ""; // Réinitialiser le contenu

    paginatedProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className =
            "border border-black rounded-lg overflow-hidden shadow-lg bg-white lg:pt-10 lg:p-5 ";
  
        productCard.innerHTML = `
            <img src="${product.img1}" alt="${product.title}" class="w-full h-48 object-cover">
            <div class="px-3 lg:pt-8 flex justify-between lg:mt-6">
                <h3 class="lg:text-xl font-bold">${product.title}</h3>  
                <i class="ri-heart-line text-xl"></i>
            </div>
            <p class="text-gray-400 lg:mt-2 uppercase px-4 underline">${product.category}</p>
            <div class="lg:p-4 p-3 flex lg:items-center justify-start lg:justify-between flex-col lg:flex-row">
                <p class="text-black font-bold mt-2 lg:text-xl">$${product.prix}</p>
                <button class="bg-yellow-500 py-1 px-4 rounded-lg font-semibold mt-2">Add to cart</button>
            </div>`;
        
        shopProductsGrid.appendChild(productCard);
    });
}

// Mise à jour de l'état des boutons de pagination
function updatePaginationButtons() {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

// Gestion des clics sur les boutons de pagination
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
        updatePaginationButtons();
        currentPageSpan.textContent = currentPage;
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }
});

nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts(currentPage);
        updatePaginationButtons();
        currentPageSpan.textContent = currentPage;
        window.scrollTo({ top: 200 , behavior: 'smooth' });
    }
});

// Initialisation
getProducts();
