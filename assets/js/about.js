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
    
}
