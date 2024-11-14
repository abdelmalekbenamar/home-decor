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
    });


}
