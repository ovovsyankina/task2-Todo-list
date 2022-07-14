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
// function changeElement(id) {
//   let textInput = document.querySelector(`#todoText_${id}`);
//   let input = document.querySelector(`#inputDop_${id}`);
//   arr.forEach((todo) => {
//     if (todo.id === id) {
//       textInput.innerHTML = `<input type="text" class="todotext_edit" id="inputDop_${id}" value="${todo.text}"/>`;

//       todo.text = textInput.firstChild.value;
//     }
//     var td = this;
//     input.addEventListener("blur", function () {
//       td.innerHTML = this.value;
//       td.addEventListener("click", changeElement(id));
//     });

//     deleteElement(todo.id);
//   });
//   // createElement();
// }
function changeElement(id) {
  let textInput = document.querySelector(`#todoText_${id}`);
  console.log(textInput.firstChild);
  let todoLi = document.querySelector(".todo");
  console.log(todoLi.childNodes[1]); //DIV

  arr.forEach((todo) => {
    if (todo.id === id) {
      textInput.innerHTML = `<input type="text" id="inputDop_${todo.id}" value="${todo.text}"/>`;
      let input = document.querySelector(`#inputDop_${todo.id}`);

      input.addEventListener("blur", function () {
        todo.text = textInput.firstChild.value;
        textInput.innerHTML = this.value;
      });
    }
  });
}

// let elem = document.querySelector(`#todoText_${id}`);
// arr.forEach((todo) => {
//   console.log(todo.id);
//   // let id = elem.getAttribute("id");
//   if (todo.id === id) {
//     let input = document.createElement("input");
//     input.value = elem.innerHTML;
//     todo.text = input.value;

//     input.addEventListener("blur", function () {
//       elem.innerHTML = this.value;
//       this.parentElement.removeChild(this); // удалим инпут
//     });

//     elem.parentElement.appendChild(input);
//   }
//   console.log(todo.text);
// });
