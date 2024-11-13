// Nav SideBar Menu  //
const menuToggle = document.getElementById("menu-toggle");
const closeSidebar = document.getElementById("close-sidebar");
const sidebar = document.getElementById("sidebar");
const overlayMenu = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

overlayMenu.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

// Cart Sidebar Popup  //
const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCartSidebar = document.getElementById("closeCartSidebar");

cartIcon.addEventListener("click", () => {
  cartSidebar.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
});

closeCartSidebar.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
  overlay.classList.add("hidden");
});

// Products json file fetch
async function getProducts() {
  const response = await fetch("https://decor.codia-dev.com/products.json");
  const data = await response.json();
  displayProducts(data.products);
  console.log(data.products);
  localStorage.setItem("data", JSON.stringify(data.products));
}

// Add to cart function
function addToCart(id) {
  let cartProduct;
  const data = JSON.parse(localStorage.getItem("data"));
  let myCart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(id);
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      cartProduct = data[i];
    }
  }

  myCart.push(cartProduct);
  localStorage.setItem("cart", JSON.stringify(myCart));
  displayCartProducts();
}

// delete product from cart popup
const deleteProduct = document.getElementById("deleteProduct");
function deleteCartProduct(deleteId) {
  let myCart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(deleteId);
  console.log("deleted");
  for (let i = 0; i < myCart.length; i++) {
    if (myCart[i].id == deleteId) {
      myCart.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(myCart));
  displayCartProducts();
}

// display cart products in cart modal
function displayCartProducts() {
  const cartPopup = document.getElementById("cartProducts");
  const myCart = JSON.parse(localStorage.getItem("cart")) || [];
  cartPopup.innerHTML = "";
  if (myCart.length == 0) {
    cartPopup.innerHTML = `No items in the cart`;
  } else {
    myCart.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className =
        "flex gap-4 p-4 border rounded-xl mt-5 mr-2 items-center relative";

      productCard.innerHTML = `
      <i class="ri-close-line absolute right-3 text-red-600 top-2" id="deleteProduct" onclick="deleteCartProduct(${product.id})"></i>
       <img src="${product.img1}" height="60px" width="60px">
          <div>
            <h2 class="font-semibold">${product.title}</h2>
            <p>${product.prix}</p>
          </div>`;
      cartPopup.appendChild(productCard);
    });
  }
}

// display products grid
const productsGrid = document.getElementById("productsGrid");
function displayProducts(products) {
  const displyedProducts = products.slice(0, 12);
  productsGrid.innerHTML = "";
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
                    <button id="btn-add" class="add-to-cart-btn bg-yellow-500 py-1 px-4 rounded-lg font-semibold mt-2" data-id="${product.id}" >Add to cart</button>
                </div>
    `;
    productsGrid.appendChild(productCard);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      addToCart(parseInt(btn.getAttribute("data-id")))
    );
  });
}
getProducts();
displayCartProducts();
