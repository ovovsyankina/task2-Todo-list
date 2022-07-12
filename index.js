let arr = [];
let todoItems = document.querySelector(".list_items");
let inputText = document.querySelector(".input_text");
let todoCheck = document.querySelector(".todo_checkbox");
let textTask = document.querySelector(".textTask");
let filter = "all";
let count = document.querySelector(".count");
function createElement() {
  todoElem = "";

  arr.forEach((todo, i) => {
    let id = i + new Date().getTime();
    arr[i].id = id;
    todoElem += `<li class="todo"  id="todo_${id}" ><input type="checkbox" class="todo_checkbox" id="todoCheck_${id}" onchange="checkElement(${id})" ${
      todo.complete ? "checked" : ""
    }><div class="textTask"  id="todoText_${id}">${todo.text}</div> 
    <button class="todoDelite" onclick="deleteElement(${id})">X</button></li>`;
    todoItems.innerHTML = todoElem;
  });
  count.innerHTML = counts() + "  items left";
  console.log(arr);
}

document.querySelector("input").addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    newElement();
    inputText.value = "";
  }
});
function newElement() {
  let infoTodo = {
    text: inputText.value,
    id: 1,
    complete: false,
  };
  if (inputText.value !== "") {
    arr.push(infoTodo);
    createElement();
  }
}

function checkElement(id) {
  let todoCheck_elemId = document.querySelector(`#todoCheck_${id}`);
  if (todoCheck_elemId.checked) {
    arr.forEach((todo) => {
      if (todo.id === id) {
        todo.complete = true;
      }
    });
  } else {
    arr.forEach((todo) => {
      if (todo.id === id) {
        todo.complete = false;
      }
    });
  }

  createElement();
}
function allElements() {
  filter = "all";
  arr.forEach((todo) => {
    document.querySelector(`#todo_${todo.id}`).style.display = "flex";
  });
}

function activeElements() {
  allElements();
  filter = "active";
  arr.forEach((todo) => {
    if (todo.complete === true) {
      document.querySelector(`#todo_${todo.id}`).style.display = "none";
    }
  });
}
function completedElements() {
  allElements();
  filter = "completed";
  arr.forEach((todo) => {
    if (todo.complete === false) {
      document.querySelector(`#todo_${todo.id}`).style.display = "none";
    }
  });
}
function filterElements() {
  if (filter === all) {
    allElements();
  }
  if (filter === active) {
    activeElements();
  }
  if (filter === completed) {
    completedElements();
  }

  createElement();
}
function counts() {
  let index = 0;
  arr.forEach((todo) => {
    if (todo.complete !== true) {
      index = index + 1;
    }
  });
  return index;
}
function deleteElement(id) {
  for (let i = arr.length; i--; ) {
    if (arr[i].id === id) {
      arr.splice(i, 1);
    }
  }
  document.querySelector(`#todo_${id}`).remove();
}
function allCompletedElements() {
  if (arr.some((element) => element.complete === false)) {
    arr.forEach((todo) => {
      todo.complete = true;
    });
  } else {
    arr.forEach((todo) => {
      todo.complete = false;
    });
  }
  createElement();
}
