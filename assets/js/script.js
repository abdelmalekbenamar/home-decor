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
