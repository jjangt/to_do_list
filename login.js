// Login with localStorage
function login() {
    const username = document.getElementById('username').value;
    if (username) {
      localStorage.setItem('username', username);
      document.getElementById('login-form').style.display = 'none';
      displayUsername();
    }
  }
  
  function displayUsername() {
    const username = localStorage.getItem('username');
    if (username) {
      const greeting = document.createElement('h3');
      greeting.textContent = `Welcome, ${username}!`;
      document.body.prepend(greeting);
    }
  }
  
  // On Page Load
  window.onload = function() {
    displayUsername();
  };
  