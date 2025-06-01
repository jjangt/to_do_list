// Todo List with localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo;
      todoList.appendChild(li);
    });
  }
  
  function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (todoText) {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.push(todoText);
      localStorage.setItem('todos', JSON.stringify(todos));
      todoInput.value = '';
      loadTodos();
  }
  
  // On Page Load
  window.onload = function() {
    loadTodos();
  };
  