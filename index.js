let arr = [];
let todoItems = document.querySelector(".list_items");
let inputText = document.querySelector(".input_text");
let todoCheck = document.querySelector(".todo_checkbox");
let textTask = document.querySelector(".textTask");
let filter = "all";
let count = document.querySelector(".count");

function localStor() {
  localStorage["arr"] = JSON.stringify(arr);
}
if (localStorage.getItem("arr")) {
  arr = JSON.parse(localStorage.getItem("arr"));
  createElement();
}
function createElement() {
  todoElem = "";

  arr.forEach((todo, i) => {
    let id = i + new Date().getTime();
    arr[i].id = id;
    todoElem += `<li class="todo"  id="todo_${id}" ><input type="checkbox" class="todo_checkbox" id="todoCheck_${id}" onchange="checkElement(${id})" ${
      todo.complete ? "checked" : ""
    }><div class="textTask"  id="todoText_${id}" ondblclick="changeElement(${id}) ">${
      todo.text
    }</div> 
    <button class="todoDelete" onclick="deleteElement(${id})">X</button></li>`;
    todoItems.innerHTML = todoElem;
  });
  count.innerHTML = counts() + "  items left";
  console.log(arr);
  filterElements();
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
  if (inputText.value.trim().length !== 0) {
    arr.push(infoTodo);
    createElement();
    localStor();
  }
}

function checkElement(id) {
  let todoCheck_elemId = document.querySelector(`#todoCheck_${id}`);
  if (todoCheck_elemId.checked) {
    arr.forEach((todo) => {
      if (todo.id === id) {
        todo.complete = true;
        localStor();
      }
    });
  } else {
    arr.forEach((todo) => {
      if (todo.id === id) {
        todo.complete = false;
        localStor();
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
    localStor();
  });
}
function filterElements() {
  if (filter === "all") {
    allElements();
  }
  if (filter === "active") {
    activeElements();
  }
  if (filter === "completed") {
    completedElements();
  }
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
  arr = arr.filter((elem) => elem.id !== id);
  document.querySelector(`#todo_${id}`).remove();
  createElement();
  localStor();
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
  localStor();
}
function clearCompletedElements() {
  arr.forEach((todo) => {
    if (todo.complete === true) {
      deleteElement(todo.id);
    }
    localStor();
  });
}

function changeElement(id) {
  let textInput = document.querySelector(`#todoText_${id}`);
  console.log(textInput.firstChild);
  let todoLi = document.querySelector(".todo");
  console.log(todoLi.childNodes[1]); //DIV

  arr.forEach((todo) => {
    if (todo.id === id) {
      textInput.innerHTML = `<input type="text" id="inputDop_${todo.id}" value="${todo.text}"/>`;

      let input = document.querySelector(`#inputDop_${todo.id}`);
      input.focus();
      input.selectionStart = input.value.length;

      input.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
          todo.text = textInput.firstChild.value;

          textInput.innerHTML = this.value;
        }
        if (input.value === "") {
          deleteElement(id);
        }
      });

      input.addEventListener("focusout", function () {
        todo.text = textInput.firstChild.value;

        textInput.innerHTML = this.value;
        if (input.value === "") {
          deleteElement(id);
        }
      });
    }
  });
}
