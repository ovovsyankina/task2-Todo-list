let arr = [];
let todoItems = document.querySelector(".list_items");
let inputText = document.querySelector(".input_text");

let todoCheck = document.querySelector(".todo_checkbox");
let textTask = document.querySelector(".textTask");
let filter = "all";
let count = document.querySelector(".count");
let active = document.querySelector(".active_filter");
let all = document.querySelector(".all_filter");
let complete = document.querySelector(".completed_filter");

let noActiveTask = document.querySelector(".noActive_task");
let noCompleteTask = document.querySelector(".noComplete_task");
let noAllTask = document.querySelector(".noAll_task");

const filterStor = JSON.parse(localStorage.getItem("filter"));
const arrStor = JSON.parse(localStorage.getItem("arr"));

function localStor() {
  localStorage["arr"] = JSON.stringify(arr);
  localStorage["filter"] = JSON.stringify(filter);
}

if (arrStor) {
  arr = arrStor;
  createElement();
}
if (filterStor) {
  filter = filterStor;
  filterElements();
}
function createElement() {
  todoElem = "";

  arr.forEach((todo, i) => {
    let id = i + new Date().getTime();
    arr[i].id = id;
    todoElem += `<li class="todo styleTodo_flex"  id="todo_${id}" ><input type="checkbox" class="todo_checkbox" id="todoCheck_${id}" onchange="checkElement(${id})" ${
      todo.complete ? "checked" : ""
    }><label class="label_textTask" for="todoCheck_${id}"> </label><div class="textTask"  id="todoText_${id}" ondblclick="changeElement(${id}) "><span>${
      todo.text
    }</span></div>
    <button class="todoDelete" onclick="deleteElement(${id})"></button></li>`;
    todoItems.innerHTML = todoElem;
  });
  if (counts() === 1) {
    count.innerHTML = counts() + "  item left";
  } else {
    count.innerHTML = counts() + "  items left";
  }

  filterElements();
}
function isPositive(todo) {
  return todo.checked === true;
}

document.querySelector("input").addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    newElement();
    inputText.value = "";
  }
});
function newElement() {
  let infoTodo = {
    text: inputText.value.trim().replace(/\s/g, "&nbsp;"),
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
  if (counts() === 0 && filter === "all") {
    noActiveTask.classList.remove("style_flex");
    noActiveTask.classList.add("style_none");
  }
  if (counts() === arr.length && filter === "all") {
    noCompleteTask.classList.remove("style_flex");
    noCompleteTask.classList.add("style_none");
  }

  if (arr.length === 0 && filter === "all") {
    noAllTask.classList.remove("style_none");
    noAllTask.classList.add("style_flex");
  } else {
    noAllTask.classList.remove("style_flex");
    noAllTask.classList.add("style_none");
  }

  arr.forEach((todo) => {
    document.querySelector(`#todo_${todo.id}`).classList.add("styleTodo_flex");
  });
  localStor();
  active.className = "active_filter ";
  complete.className = "completed_filter ";
  all.className = "all_filter active_button";
}

function activeElements() {
  allElements();
  filter = "active";
  if (counts() === 0 && filter === "active" && arr.length !== 0) {
    noActiveTask.classList.remove("style_none");
    noActiveTask.classList.add("style_flex");
  } else {
    noActiveTask.classList.remove("style_flex");
    noActiveTask.classList.add("style_none");
  }
  arr.forEach((todo) => {
    if (todo.complete === true && filter === "active") {
      document
        .querySelector(`#todo_${todo.id}`)
        .classList.add("styleTodo_none");
      document
        .querySelector(`#todo_${todo.id}`)
        .classList.remove("styleTodo_flex");
    } else {
      document
        .querySelector(`#todo_${todo.id}`)
        .classList.remove("styleTodo_none");
      document
        .querySelector(`#todo_${todo.id}`)
        .classList.add("styleTodo_flex");
    }
  });
  localStor();
  active.className = "active_filter active_button";
  complete.className = "completed_filter ";
  all.className = "all_filter ";
}
function completedElements() {
  allElements();
  filter = "completed";
  if (counts() === arr.length && filter === "completed" && arr.length !== 0) {
    noCompleteTask.classList.remove("style_none");
    noCompleteTask.classList.add("style_flex");
  } else {
    noCompleteTask.classList.remove("style_flex");
    noCompleteTask.classList.add("style_none");
  }
  arr.forEach((todo) => {
    if (todo.complete === false) {
      document
        .querySelector(`#todo_${todo.id}`)
        .classList.add("styleTodo_none");
      document
        .querySelector(`#todo_${todo.id}`)
        .classList.remove("styleTodo_flex");
    } else {
      document
        .querySelector(`#todo_${todo.id}`)
        .classList.remove("styleTodo_none");
      document
        .querySelector(`#todo_${todo.id}`)
        .classList.add("styleTodo_flex");
    }
  });
  localStor();
  active.className = "active_filter ";
  complete.className = "completed_filter active_button";
  all.className = "all_filter ";
}

function filterElements() {
  if (filter === "all") {
    allElements();
  } else if (filter === "active") {
    activeElements();
  } else if (filter === "completed") {
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

  arr.forEach((todo) => {
    if (todo.id === id) {
      textInput.innerHTML = `<input type="text" class="inputDop_class" id="inputDop_${id}" value="${todo.text}"/>`;

      let input = textInput.firstChild;
      input.focus();
      input.selectionStart = input.value.length;

      input.addEventListener("focusout", function () {
        if (input.value.trim().length !== 0) {
          todo.text = textInput.firstChild.value
            .trim()
            .replace(/\s/g, "&nbsp;");
          createElement();
          localStor();
        } else {
          deleteElement(id);
        }
      });
      input.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          todo.text = textInput.firstChild.value
            .trim()
            .replace(/\s/g, "&nbsp;");
          textInput.innerHTML = this.value;
          createElement();
          localStor();
        }
      });
    }
  });
}
