const inputText = document.getElementById("input");
const listContaner = document.getElementById("list");
const addButton = document.getElementById("btn");

addButton.addEventListener("click", () => {
  if (inputText.value === "") {
    alert("Please enter a value");
  } else {
    // List Item
    const liItem = document.createElement("li");
    liItem.innerHTML = `<span>${inputText.value}</span>`;
    listContaner.appendChild(liItem);

    // Checkbox
    const input = document.createElement("input");
    input.type = "checkbox";
    liItem.prepend(input);

    // Checkbox Event
    input.addEventListener("change", () => {
      if (input.checked) {
        liItem.getElementsByTagName("span")[0].style.textDecoration =
          "line-through";
        liItem.style.backgroundColor = "gray";
        liItem.style.color = "white";
      } else {
        liItem.getElementsByTagName("span")[0].style.textDecoration = "none";
        liItem.style.backgroundColor = "white";
        liItem.style.color = "black";
      }
    });

    // Delete Button
    const btnn = document.createElement("button");
    btnn.textContent = "Delete";
    liItem.appendChild(btnn);
    btnn.addEventListener("click", () => {
      listContaner.removeChild(liItem);
    });
    inputText.value = "";
  }
});
