const todoContainerEl = document.querySelector("#todoContainer");
const todoInputEl = document.querySelector("#todoInput");
const todoButtonEl = document.querySelector("#todoButton");
const logoutButtonEl = document.querySelector("#logoutButton");

const isLogin = () => {
  const loginedUser = localStorage.getItem("login");
  if (!loginedUser) {
    alert("로그인이 필요합니다!");
    location.href = "./signin.html";
  }
};

const readTodo = () => {
  todoContainerEl.innerHTML = "";

  const todos = JSON.parse(localStorage.getItem("todos")).reverse();

  todos.forEach((todo) => {
    const divEl = document.createElement("div");
    const completeEl = document.createElement("input");
    const userEl = document.createElement("p");
    const deleteEl = document.createElement("button");
    const contentEl = document.createElement("label");

    divEl.className = "todoItem";

    completeEl.type = "checkbox";
    completeEl.className = "checkbox";
    completeEl.id = todo.id;
    completeEl.addEventListener("click", () => {
      updateComplete(todo.id, completeEl.checked);
    });
    completeEl.checked = todo.complete;

    deleteEl.type = "button";
    deleteEl.textContent = "X";
    deleteEl.className = "deleteButton";
    deleteEl.addEventListener("click", () => deleteTodo(todo.id));

    contentEl.textContent = todo.content;
    contentEl.htmlFor = todo.id; // 텍스트 클릭해도 체크가 되도록 함

    userEl.textContent = todo.user;

    divEl.append(completeEl, contentEl, userEl, deleteEl);
    todoContainerEl.append(divEl);
  });
};

const updateComplete = (id, checkedValue) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const newTodo = todos.map((todo) => {
    todo.id === id
      ? (todo.complete = checkedValue)
      : (todo.complete = todo.complete);
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(newTodo));
  readTodo();
};

const createTodo = () => {
  const todoText = todoInputEl.value;

  const todos = JSON.parse(localStorage.getItem("todos"));
  //새로운 id 추가 로직. 끝 id에 1을 더한 값의 인덱스에 id 추가
  const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

  const newTodo = {
    id: newId,
    complete: false,
    content: todoText,
    user: JSON.parse(localStorage.getItem("login")),
  };

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
  todoInputEl.value = "";

  readTodo();
};

const deleteTodo = (deleteId) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const filteredTodos = todos.filter((todo) => todo.id !== deleteId);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  readTodo();
};

const logout = () => {
  alert("로그아웃!");
  localStorage.removeItem("login");
  location.href = "./signin.html";
};

const init = () => {
  isLogin();

  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
  }

  readTodo();

  todoInputEl.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      e.preventDefault();
      createTodo();
    }
  });
  todoButtonEl.addEventListener("click", createTodo);
  logoutButtonEl.addEventListener("click", logout);
};

document.addEventListener("DOMContentLoaded", init);
