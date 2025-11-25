// Product database
const products = {
    1: { id: 1, name: 'Premium Dog Food', price: 29.99, category: 'dog', description: 'High-quality nutrition for your dog. Made with real meat and vegetables.' },
    2: { id: 2, name: 'Cat Scratching Post', price: 19.99, category: 'cat', description: 'Keep your furniture safe. Durable sisal rope construction.' },
    3: { id: 3, name: 'Bird Cage Deluxe', price: 79.99, category: 'bird', description: 'Spacious cage for your feathered friend. Includes perches and feeders.' },
    4: { id: 4, name: 'Dog Toy Bundle', price: 14.99, category: 'dog', description: 'Set of 5 durable toys. Perfect for fetch and chew time.' },
    5: { id: 5, name: 'Cat Litter Premium', price: 12.99, category: 'cat', description: 'Odor control formula. Clumping and easy to clean.' },
    6: { id: 6, name: 'Bird Seed Mix', price: 8.99, category: 'bird', description: 'Nutritious blend for all birds. Contains sunflower seeds, millet, and more.' }
};

// Initialize cart from localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.length;
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        el.textContent = count;
    });
}

function addToCart(productId) {
    const cart = getCart();
    const product = products[productId];
    
    if (product) {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price
        });
        saveCart(cart);
        alert(`${product.name} added to cart!`);
    }
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    
    // Reload cart page if we're on it
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

