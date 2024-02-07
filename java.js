document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slider img');
    let currentSlide = 0;

    function showSlide() {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        // Show current slide
        slides[currentSlide].classList.add('active');
        // Move to the next slide
        currentSlide = (currentSlide + 1) % slides.length;
        // Call the function recursively after 3 seconds
        setTimeout(showSlide, 3000);
    }

    // Initial call to start the slideshow
    showSlide();
});

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

//shop 
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
   
  document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.fade');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 6000); // Change image every 6 seconds (adjust as needed)
});


  //login 
  document.getElementById('login-button').addEventListener('click', function(event) { 
    event.preventDefault(); // Prevent the default form submission 
   
    validateLogin(); 
  }); 
   
  async function validateLogin() { 
    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 
   
    const userData = await fetchDataFromRestDB(username, password); 
   
    if (userData) { 
      alert('Login successful!'); 
      // Redirect or perform other actions after successful login. 
      window.location.href = 'index.html'; 
    } else { 
      alert('Invalid username or password. Please try again.'); 
    } 
  } 
   
  async function fetchDataFromRestDB(username, password) { 
    try { 
      const response = await fetch( 
        'https://users-cf9d.restdb.io/rest/users?q={"username": "${username}", "password": "${password}"}', 
        { 
          method: 'GET', 
          headers: { 
            'Content-Type': 'application/json', 
            'x-apikey': '14ef5d0bdd76adcf11d7e24067d260f5ef9cc', 
          }, 
        } 
      ); 
   
      if (!response.ok) { 
        throw new Error('Network error or invalid response'); 
      } 
   
      const userData = await response.json(); 
   
      // Check if the fetched data is an array or object 
      if (Array.isArray(userData)) { 
        return userData[0]; // Assuming you have a single user with unique credentials. 
      } else { 
        return userData; // Directly return the user object (for sign-up scenario) 
      } 
    } catch (error) { 
      console.error('Error fetching data from RestDB:', error); 
      return null; 
    } 
  } 
   
   
   
  //signup 
  document.getElementById('signupForm').addEventListener('submit', function(event) { 
    event.preventDefault(); 
    submitSignup(); 
  }); 
   
  async function submitSignup() { 
    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 
   
    // Add additional fields as needed for the user data 
   
    const success = await addUserDataToRestDB(username, password); 
   
    if (success) { 
      alert('Sign up successful!'); 
       
      // Redirect to login.html after successful sign-up 
      window.location.href = 'login.html'; 
    } else { 
      alert('Failed to sign up. Please try again.'); 
    } 
  } 
   
  async function addUserDataToRestDB(username, password) { 
    try { 
      const response = await fetch('https://users-cf9d.restdb.io/rest/users', { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json', 
          'x-apikey': '14ef5d0bdd76adcf11d7e24067d260f5ef9cc', // Replace with your RestDB API key 
        }, 
        body: JSON.stringify({ 
          username: username, 
          password: password, 
          // Add additional fields as needed for the user data 
        }), 
      }); 
   
      if (!response.ok) { 
        throw new Error('Failed to add user data'); 
      } 
   
      const userData = await response.json(); 
      console.log('User added successfully:', userData); 
      return true; 
    } catch (error) { 
      console.error('Error adding user data to RestDB:', error); 
      return false; 
    } 
  }
  