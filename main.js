const inputText = document.getElementById("input");
const listContaner = document.getElementById("list");
const addButton = document.getElementById("btn");
const inputCheckbox = document.getElementById("default-checkbox");

inputCheckbox.addEventListener("change", (e) => {
  //change label text color
  console.log("e.target.checked", e.target.checked);
  console.log("taskName", e);
  if (e.target.checked) {
    taskName.style.textDecorationLine = "line-through";
  } else {
    taskName.style.textDecorationLine = "none";
  }
});

addButton.addEventListener("click", () => {
  if (inputText.value === "") {
    alert("Please enter a value");
  } else {
    //const current Time
    const currentTime = new Date().toISOString();
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");
    // listItem.id = `task-${currentTime}`;
    const divItem = document.createElement("div");
    divItem.classList.add("task-item__div");
    const inputItem = document.createElement("input");
    inputItem.type = "checkbox";
    inputItem.classList.add("task-item__input");
    const label = document.createElement("label");
    // label.id = `label-${currentTime}`;
    label.textContent = inputText.value;

    divItem.appendChild(inputItem);
    divItem.appendChild(label);

    listItem.appendChild(divItem);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    listItem.appendChild(deleteBtn);

    //finally list item send to ul
    listContaner.appendChild(listItem);
  }
});
