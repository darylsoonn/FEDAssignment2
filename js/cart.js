window.onload = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsElement = document.getElementById('cart-items');
    let total = 0;
    cartItems.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.image}" alt="${item.title}"> ${item.title} - $${item.price.toFixed(2)}`;
        cartItemsElement.appendChild(li);
    });
    cartItemsElement.innerHTML += `<li>Total: $${total.toFixed(2)}</li>`;
};


function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.remove();
    }, 2000);
}



