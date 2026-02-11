const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const closeCartBtn = document.getElementById("close-cart");
const cartOverlay = document.getElementById("cart-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   OPEN & CLOSE CART
========================= */
function openCart(e) {
  if (e) e.preventDefault();
  cartModal?.classList.remove("hidden");
}

function closeCart() {
  cartModal?.classList.add("hidden");
}

if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
if (cartBtn) cartBtn.addEventListener("click", openCart);

/* =========================
   CART COUNT
========================= */
function updateCartCount() {
  if (!cartCount) return;
  cartCount.textContent = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}

/* =========================
   RENDER CART
========================= */
function renderCart() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>₦${item.price.toLocaleString()}</p>
          <div class="qty-controls">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  });

  cartTotalEl.textContent = `₦${total.toLocaleString()}`;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* =========================
   QUANTITY CONTROL
========================= */
window.changeQty = function (index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
};

/* =========================
   ADD TO CART (GLOBAL)
========================= */
window.addToCart = function (productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  renderCart();
  openCart();
};

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
