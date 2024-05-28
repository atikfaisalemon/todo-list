// const inputText = document.getElementById("input");
// const listContaner = document.getElementById("list");
// const addButton = document.getElementById("btn");

// addButton.addEventListener("click", () => {
//   if (inputText.value === "") {
//     alert("Please enter a value");
//   } else {
//     // List Item
//     const liItem = document.createElement("li");
//     liItem.innerHTML = `<span>${inputText.value}</span>`;
//     listContaner.appendChild(liItem);

//     // Checkbox
//     const input = document.createElement("input");
//     input.type = "checkbox";
//     liItem.prepend(input);

//     // Checkbox Event
//     input.addEventListener("change", () => {
//       if (input.checked) {
//         liItem.getElementsByTagName("span")[0].style.textDecoration =
//           "line-through";
//         liItem.style.backgroundColor = "gray";
//         liItem.style.color = "white";
//       } else {
//         liItem.getElementsByTagName("span")[0].style.textDecoration = "none";
//         liItem.style.backgroundColor = "white";
//         liItem.style.color = "black";
//       }
//       // saveData();
//       // loadData();
//     });

//     // Delete Button
//     const btnn = document.createElement("button");
//     btnn.textContent = "Delete";
//     liItem.appendChild(btnn);
//     btnn.addEventListener("click", () => {
//       listContaner.removeChild(liItem);
//       // saveData();
//       // loadData();
//     });
//     inputText.value = "";
//     // saveData();
//     // loadData();
//   }
// });

// function saveData() {
//   localStorage.setItem("data", listContaner.innerHTML);
// }

// function loadData() {
//   listContaner.innerHTML = localStorage.getItem("data");
// }
// loadData();

// Task file
class Task {
  constructor() {
    this.isCheck = false;
    this.value = "";
  }
  setCheck(value) {
    this.isCheck = value; // true or false
  }

  setValue(value) {
    this.value = value;
  }
}

// Task list file
class TaskList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
  }
}
// list of tasks
const taskList = new TaskList();

// operation file
const inputForm = document.getElementById("inputForm");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const task = formData.get("task");

  if (task === "") {
    return alert("Please enter a value");
  }

  // create a new single task
  const newTask = new Task();
  newTask.setValue(task);
  // Add this single task to the task list
  taskList.addTask(newTask);
  // Render the task list
  renderTaskList(taskList);
  window.localStorage.setItem("taskList", JSON.stringify(taskList));
  inputForm.reset();
});

// UI render framerowk
const renderTaskList = (taskList) => {
  const listContainer = document.getElementById("list");
  listContainer.innerHTML = "";
  const listItems = taskList.tasks?.map((task, index) => {
    return `
    <li>
      <input type="checkbox" ${task.isCheck ? "checked" : ""} />
      <span>${task.value}</span>
      <button class="delete" data-index="${index}">Delete</button>
    </li>
    `;
  });

  listItems?.length &&
    listContainer.insertAdjacentHTML("beforeend", listItems?.join(""));

  // Set event listeners for delete buttons
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      taskList.deleteTask(index);
      renderTaskList(taskList);
      window.localStorage.setItem("taskList", JSON.stringify(taskList));
    });
  });
  // Set event listeners for checkboxes
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("change", (e) => {
      taskList.tasks[index].isCheck = e.target.checked;
      renderTaskList(taskList);
      window.localStorage.setItem("taskList", JSON.stringify(taskList));
    });
  });
  // Set styles for tasks
  const spans = document.querySelectorAll("span");
  spans.forEach((span, index) => {
    if (taskList.tasks[index].isCheck) {
      span.style.textDecoration = "line-through";
      span.parentElement.style.backgroundColor = "gray";
      span.parentElement.style.color = "white";
    } else {
      span.style.textDecoration = "none";
      span.parentElement.style.backgroundColor = "white";
      span.parentElement.style.color = "black";
    }
  });
};

const localData = window.localStorage.getItem("taskList");
const jsonLocalData = JSON.parse(localData);
taskList.tasks = jsonLocalData?.tasks ? jsonLocalData?.tasks : [];
renderTaskList(taskList);
