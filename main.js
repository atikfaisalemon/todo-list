const inputText = document.getElementById("input");
const listContaner = document.getElementById("list");
const addButton = document.getElementById("btn");

addButton.addEventListener("click", () => {
  if (inputText.value === "") {
    alert("Please enter a value");
  } else {
    const listItem = document.createElement("li");
    listItem.textContent = inputText.value;
    listContaner.appendChild(listItem);
    inputText.value = "";
  }
});
