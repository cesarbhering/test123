function loadCart() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cart-items');
    const cartEmptyDiv = document.getElementById('cart-empty');
    const checkoutSection = document.getElementById('checkout-section');
    const totalAmountSpan = document.getElementById('total-amount');
    
    if (cart.length === 0) {
        cartItemsDiv.style.display = 'none';
        cartEmptyDiv.style.display = 'block';
        checkoutSection.style.display = 'none';
        totalAmountSpan.textContent = '0.00';
    } else {
        cartItemsDiv.style.display = 'block';
        cartEmptyDiv.style.display = 'none';
        checkoutSection.style.display = 'block';
        
        let total = 0;
        cartItemsDiv.innerHTML = '';
        
        cart.forEach((item, index) => {
            total += item.price;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
        
        totalAmountSpan.textContent = total.toFixed(2);
    }
}

function checkout() {
    const cart = getCart();
    if (cart.length > 0) {
        // Clear the cart
        localStorage.removeItem('cart');
        updateCartCount();
        
        // Show success message
        document.getElementById('cart-items').style.display = 'none';
        document.getElementById('checkout-section').style.display = 'none';
        document.getElementById('cart-total').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', loadCart);

