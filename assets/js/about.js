const products = 4; 
const Top_p = document.getElementById("Top_P"); 
let allProducts = []; 
async function getProducts() {
    try {
        
        const response = await fetch("https://decor.codia-dev.com/products.json");
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        
        
        allProducts = data.products;

        afficher();


    } catch (error) {
        
        console.error("Erreur lors de la récupération des produits :", error);
    }
}

function afficher() {
    Top_p.innerHTML = "";
    const topProducts = allProducts.slice(0, products);
    topProducts.forEach((product) => {
        const productContainer = document.createElement("div");
        productContainer.className = "product-container flex flex-col md:flex-row items-start mb-10 gap-10"; 

        const productCard = document.createElement("div");
        productCard.className = "border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white w-full md:w-1/2";  
        productCard.innerHTML = `
            <img src="${product.img1}" alt="${product.title}" class="w-full h-32 object-cover md:h-48">
            <div class="px-4 pt-4 flex justify-between">
                <h3 class="text-sm font-bold md:text-lg">${product.title}</h3>  
                <i class="ri-heart-line text-sm md:text-xl"></i>
            </div>
            <p class="text-gray-400 text-xs uppercase px-4 underline md:text-sm">${product.category}</p>
            <div class="p-4 flex flex-col md:flex-row justify-between">
                <p class="text-black font-bold text-sm md:text-lg md:mt-2">$${product.prix}</p>
                <button class="bg-yellow-500 py-1 px-3 rounded-md font-semibold text-xs md:text-base mt-2">Add to cart</button>
            </div>`;
        const productDescription = document.createElement("div");
        productDescription.className = "product-description w-full h-full md:w-1/2 px-4 flex items-center";
        productDescription.innerHTML = `
            <p class="text-black-600 text-base text-center md:mt-6">${product.description}</p>`;
        productContainer.appendChild(productCard);
        productContainer.appendChild(productDescription);
        Top_p.appendChild(productContainer);
    });

}

    getProducts();