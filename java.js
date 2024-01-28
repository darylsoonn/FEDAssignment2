function handleScroll() {
    window.addEventListener('scroll', function () {
        var blurValue = Math.min(50, window.scrollY * 0.5);
        document.querySelector('.image-background img').style.filter = 'blur(' + blurValue + 'px)';
    });
}

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
    newContainer.classList.add('data-container'); 
   
    newContainer.innerHTML = `  
        <h2>${data.title}</h2>  
        <p>${data.description}</p>  
        <p>Price: $${data.price}</p>  
        <img src="${data.image}" alt="${data.title}">  
    `; 
   
    dataContainer.appendChild(newContainer); 
  }  
    
  for (let productId = 1; productId <= 30; productId++) { 
    fetchData(productId); 
  }
  