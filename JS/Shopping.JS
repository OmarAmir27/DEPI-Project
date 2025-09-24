let cartItems = [
    { id: 1, name: 'Minimalist Mug', price: 15.00, quantity: 1, image: '/Images/3.webp' },
    { id: 2, name: 'Designer Notebook', price: 25.50, quantity: 2, image: '/Images/5.webp' },
    { id: 3, name: 'Leather Wallet', price: 75.00, quantity: 1, image: '/Images/7.webp' }
];
const cartItemsList = document.getElementById('cart-items-list');
const subtotalDisplay = document.getElementById('subtotal-display');
const totalDisplay = document.getElementById('total-display');
function renderCartItems() {
    cartItemsList.innerHTML = '';
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.style.animationDelay = `${index * 0.1}s`;
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-control">
                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
            </div>
            <button class="remove-btn" data-id="${item.id}" data-action="remove">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        cartItemsList.appendChild(itemElement);
    });
}
function updateCartTotals() {
    let subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let total = subtotal;
    subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
    totalDisplay.textContent = `$${total.toFixed(2)}`;
}
function handleCartActions(event) {
    const button = event.target.closest('button');
    if (!button) return;
    const itemId = parseInt(button.dataset.id);
    const action = button.dataset.action;
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;
    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease') {
        if (item.quantity > 1) {
            item.quantity--;
        }
    } else if (action === 'remove') {
        cartItems = cartItems.filter(i => i.id !== itemId);
    }
    
    renderCartItems();
    updateCartTotals();
}
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateCartTotals();
});
cartItemsList.addEventListener('click', handleCartActions);