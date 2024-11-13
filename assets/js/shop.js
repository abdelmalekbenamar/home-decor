async function getProducts() {
    const response = await fetch("https://decor.codia-dev.com/products.json");
    const data = await response.json();
    displayProducts(data.products);
    console.log(data.products);
  }
  
  // display products grid
  const shopProductsGrid = document.getElementById("shopProductsGrid");
  function displayProducts(products) {
    const displyedProducts = products.slice(0, 40);
    shopProductsGrid.innerHTML = "";
    displyedProducts.forEach((product) => {
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
                  </div>`
      ;
      shopProductsGrid.appendChild(productCard);
    });
  }
  getProducts();
      