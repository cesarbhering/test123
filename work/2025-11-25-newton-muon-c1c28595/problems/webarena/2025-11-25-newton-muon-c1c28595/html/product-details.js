document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId && products[productId]) {
        const product = products[productId];
        const detailsDiv = document.getElementById('product-details');
        
        detailsDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <p><strong>Category:</strong> ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
            <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
        `;
    } else {
        const detailsDiv = document.getElementById('product-details');
        detailsDiv.innerHTML = '<p>Product not found.</p>';
    }
});

