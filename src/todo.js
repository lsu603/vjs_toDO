const toDoForm = document.querySelector(".js-toDoForm"),
  toDoinput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  // const btn =  event.target;
  const btn = event.target;
  //   const div = btn.parentNode;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function parintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("text");
  const div = document.createElement("div");
  const newId = toDos.length + 1;
  const delBtn = document.createElement("button");
  span.innerText = text;
  delBtn.innerText = "✖";
  delBtn.addEventListener("click", deleteToDo);
  // span.appendChild(delBtn);
  delBtn.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    id: newId,
    text: text
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoinput.value;
  parintToDo(currentValue);
  toDoinput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      parintToDo(toDo.text);
    });
  }
}

function toDoloadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    toDoForm.classList.remove(SHOWING_CN);
  } else {
    toDoForm.classList.add(SHOWING_CN);
  }
}

function init() {
  setInterval(toDoloadName, 100);
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
