document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    const path = window.location.pathname.split('/').pop().toLowerCase();

    // Home Page (Show 6 Products)
    if (path === 'index.html' || path === '') {
        renderGrid(PRODUCTS.slice(0, 6), 'home-grid');
    } 
    // Shop Page (Show All 8 Products)
    else if (path.includes('products.html')) {
        renderGrid(PRODUCTS, 'shop-grid');
    }
    // Detail Page
    else if (path.includes('product-detail.html')) {
        const id = new URLSearchParams(window.location.search).get('id');
        const p = PRODUCTS.find(x => x.id == id);
        if(p) {
            document.getElementById('p-img').src = p.image;
            document.getElementById('p-name').innerText = p.name;
            document.getElementById('p-price').innerText = `$${p.price.toFixed(2)}`;
            document.getElementById('p-desc').innerText = p.desc;
            document.getElementById('p-btn').onclick = () => addToCart(p.id);
        }
    }
});

function renderGrid(data, containerId) {
    const grid = document.getElementById(containerId);
    if(!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="card">
            <p class="tag">${p.category}</p>
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <span class="price">$${p.price.toFixed(2)}</span>
            <div style="display:flex; gap:10px;">
                <button onclick="addToCart(${p.id})" class="btn btn-primary" style="flex:2">Add to Cart</button>
                <a href="product-detail.html?id=${p.id}" class="btn btn-secondary" style="flex:1">View</a>
            </div>
        </div>
    `).join('');
}