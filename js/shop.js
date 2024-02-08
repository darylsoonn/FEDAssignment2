async function fetchData(productId) {  
    try {  
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);  
        const data = await response.json();  
        displayData(data);  
    } catch (error) {  
        console.error(error);  
    }  
  }  
   
  function displayData(data) {  
    const dataContainer = document.getElementById('data-container');  
    const newContainer = document.createElement('div'); 
    newContainer.classList.add('product-container'); // Add class for product container 
   
    newContainer.innerHTML = `  
        <h2>${data.title}</h2>  
        <p>${data.description}</p>  
        <p>Price: $${data.price}</p>  
        <img src="${data.image}" alt="${data.title}">  
        <button class="buy-button" onclick="addToCart('${data.title}', ${data.price}, '${data.image}')">Buy</button> 
    `; 
   
    dataContainer.appendChild(newContainer); 
  }  
  for (let productId = 1; productId <= 30; productId++) { 
    fetchData(productId); 
  } 
   
  const addToCart = (title, price, image) => { 
    const cartItem = { title, price, image }; // Include image in the cart item object 
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
    cartItems.push(cartItem); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    showPopup('Added to cart!'); 
  } 
   
   
  function showPopup(message) { 
    const popup = document.createElement('div'); 
    popup.className = 'popup'; 
    popup.textContent = message; 
    document.body.appendChild(popup); 
    setTimeout(() => { 
        popup.remove(); 
    }, 2000); 
  } 
   
  const fetchProducts = async () => { 
    for (let productId = 1; productId <= 30; productId++) { 
        await fetchData(productId); 
    } 
  } 
   
  // Function to clear cart items from localStorage 
  function clearCart() { 
    localStorage.removeItem('cartItems'); 
  } 
   
  // Call the clearCart function when the page is loaded 
  window.onload = clearCart; 
   
  fetchProducts();
  