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
            "border border-black rounded-lg overflow-hidden shadow-lg bg-white ";

        productCard.innerHTML = `
                                <img src="${product.img1}" alt="${product.title}" class="w-full h-32 object-cover md:h-48">
                                <div class="px-4 pt-4 flex justify-between">
                                    <h3 class="text-sm font-bold md:text-lg">${product.title}</h3>  
                                    <i class="ri-heart-line text-sm md:text-xl"></i>
                                </div>
                                <p class="text-gray-400 text-xs uppercase px-4 underline md:text-sm">${product.category}</p>
                                <div class="p-4 flex justify-start  justify-between flex-col md:flex-row">
                                    <p class="text-black  font-bold text-sm md:text-lg md:mt-2">$${product.prix}</p>
                                    <button class="bg-yellow-500 py-1 px-3 rounded-md font-semibold text-xs md:text-base mt-2">Add to cart</button>
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
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }
});

function displayFeaturedProducts() {
    const slider = document.getElementById("newSlider");
    const featuredProducts = allProducts.slice(0, 8); // Exemple: sélection des 5 premiers produits

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
    <button class="bg-yellow-500 py-1 text-sm  px-3 rounded-md font-semibold text-xs  mt-2">Add to cart</button>
  </div>
        `;

        slider.appendChild(productCard);
    });
}

// Appelez cette fonction après avoir récupéré les produits dans `getProducts()`
getProducts().then(() => displayFeaturedProducts());
// displayFeaturedProducts();

// Initialisation
getProducts();
