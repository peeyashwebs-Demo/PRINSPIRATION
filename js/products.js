/* =====================================
   PRINSPIRATION – PRODUCTS PAGE LOGIC
   ===================================== */

const productsGrid = document.getElementById("products-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

/* -----------------------------
   RENDER PRODUCTS
----------------------------- */
function renderProducts(productList) {
  productsGrid.innerHTML = "";

  if (productList.length === 0) {
    productsGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="margin-bottom:16px;border-radius:8px;">
      <h3>${product.name}</h3>
      <p style="color:#b5b8c5;font-size:0.9rem;margin:8px 0;">
        ${product.shortSpecs}
      </p>
      <strong style="display:block;margin:12px 0;">
        ₦${product.price.toLocaleString()}
      </strong>

      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
        <a href="product.html?id=${product.id}" class="btn" style="border:1px solid #2f8cff;">
          View Details
        </a>
      </div>
    `;

    productsGrid.appendChild(productCard);
  });
}

/* -----------------------------
   CATEGORY FILTERING
----------------------------- */
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    filterButtons.forEach(btn => btn.classList.remove("btn-primary"));
    button.classList.add("btn-primary");

    if (category === "all") {
      renderProducts(products);
    } else {
      const filtered = products.filter(
        product => product.category === category
      );
      renderProducts(filtered);
    }
  });
});

/* -----------------------------
   INIT
----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
});
