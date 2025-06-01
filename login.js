// Login with localStorage
function login() {
  const username = document.getElementById('username').value;
  if (username) {
    localStorage.setItem('username', username);
    document.getElementById('login-form').style.display = 'none';
    displayUsername();
  }
}

// Display Username Greeting
function displayUsername() {
  const username = localStorage.getItem('username');
  if (username) {
    // 기존 인사 메시지가 있으면 제거
    const existingGreeting = document.getElementById('greeting');
    if (existingGreeting) {
      existingGreeting.remove();
    }

    // 새 인사 메시지 생성
    const greeting = document.createElement('div');
    greeting.id = 'greeting';
    greeting.innerHTML = `
      <h3>Welcome, ${username}!</h3>
      <button onclick="logout()">Logout</button>
    `;
    document.body.prepend(greeting);
  }
}

// Logout
function logout() {
  localStorage.removeItem('username');
  document.getElementById('greeting')?.remove();
  document.getElementById('login-form').style.display = 'block';
}

// On Page Load
window.onload = function () {
  const username = localStorage.getItem('username');
  console.log(username);
  if (username) {
    displayUsername();
  } else {
    document.getElementById('login-form').style.display = 'block';
  }
};
