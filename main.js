// ============================
// 🕒 CLOCK 기능
// ============================
function updateClock() {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate().toString().padStart(2, '0');
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const day = days[now.getDay()];
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const formatted = `${month}월 ${date}일 ${day} ${hours}:${minutes}:${seconds}`;
  document.getElementById('clock').textContent = formatted;
}
setInterval(updateClock, 1000);
updateClock();


// ============================
// ✅ LOGIN 기능
// ============================
function login() {
  const userName = document.getElementById('userName').value;

  if (userName) {
    localStorage.setItem('userName', userName);
    displayUsername(userName);
    changeLoginStatus();
    loadTodos();
  }
}

function changeLoginStatus() {
  const loginForm = document.getElementById('login-form');
  const todoForm = document.getElementById('todo-form');
  const todoList = document.getElementById('todo-list');
  const userName = localStorage.getItem('userName');

  if (userName) {
    loginForm.style.display = 'none';
    todoForm.style.display = 'block';
    todoList.style.display = 'block';
  } else {
    loginForm.style.display = 'block';
    todoForm.style.display = 'none';
    todoList.style.display = 'none';
  }
}

function displayUsername(userName) {
  const greeting = document.getElementById('greeting');
  greeting.innerHTML = `
    <h3>Welcome, ${userName}!</h3>
    <button onclick="logout()">Logout</button>
  `;
}

function logout() {
  localStorage.removeItem('userName');
  document.getElementById('greeting').innerHTML = '';
  changeLoginStatus();
  document.getElementById('todo-form').style.display = 'none';
  document.getElementById('todo-list').style.display = 'none';
}


// ============================
// ✅ TODO 기능
// ============================
function loadTodos() {
  const userName = localStorage.getItem('userName');
  if (!userName) return;

  const todos = JSON.parse(localStorage.getItem(`todos_${userName}`)) || [];
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.className = todo.completed ? 'completed' : '';

    li.addEventListener('click', () => {
      todos[index].completed = !todos[index].completed;
      localStorage.setItem(`todos_${userName}`, JSON.stringify(todos));
      loadTodos();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      localStorage.setItem(`todos_${userName}`, JSON.stringify(todos));
      loadTodos();
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function addTodo() {
  const userName = localStorage.getItem('userName');
  if (!userName) {
    alert('로그인 후에만 Todo를 작성할 수 있습니다.');
    return;
  }

  const todoInput = document.getElementById('todo-input');
  const todoText = todoInput.value.trim();

  if (todoText) {
    const todos = JSON.parse(localStorage.getItem(`todos_${userName}`)) || [];
    todos.push({ text: todoText, completed: false });
    localStorage.setItem(`todos_${userName}`, JSON.stringify(todos));
    todoInput.value = '';
    loadTodos();
  }
}


// ============================
// 🌤 WEATHER 기능
// ============================
function fetchWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const apiKey = '584ea059ce7d216be2cb25b14025fe60';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=kr`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.cod !== 200) {
              throw new Error(data.message || '날씨 API 오류');
            }

            const location = data.name ?? '현재 위치';
            const weather = data.weather?.[0]?.description ?? '정보 없음';
            const temperature = data.main?.temp ?? 'N/A';
            const iconCode = data.weather?.[0]?.icon;

            document.getElementById('weather').innerHTML = `
              <strong>${location}</strong><br>
              <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${weather}" />
              🌡 ${temperature}°C, ${weather}
            `;
          })
          .catch((error) => {
            document.getElementById('weather').textContent =
              '날씨 정보를 불러올 수 없습니다.';
          });
      },
      (error) => {
        document.getElementById('weather').textContent =
          '위치 정보를 가져올 수 없습니다.';
      }
    );
  } else {
    document.getElementById('weather').textContent =
      'Geolocation 기능이 지원되지 않습니다.';
  }
}

// ============================
// 🎨 RANDOM BACKGROUND 기능
// ============================
function setRandomBackground() {
  const totalImages = 6;
  const randomIndex = Math.floor(Math.random() * totalImages) + 1;
  const imagePath = `img/Italia${randomIndex}.jpg`;

  document.body.style.backgroundImage = `url('${imagePath}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center center';
  document.body.style.backgroundAttachment = 'fixed';
}

// ============================
// 🚀 초기 실행 (페이지 로드 시)
// ============================
window.onload = function () {
  const userName = localStorage.getItem('userName');

  if (userName) {
    displayUsername(userName);
    changeLoginStatus();
    loadTodos();
  } else {
    changeLoginStatus();
  }

  fetchWeather(); // 🌤 날씨 정보 불러오기
  setRandomBackground(); // 🎨 랜덤 배경 설정
};
