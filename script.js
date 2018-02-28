const addItems = document.querySelector(".add-items"),
    itemList = document.querySelector(".plates"),
    items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(event) {
    event.preventDefault();
    const text = (this.querySelector("[name=item]")).value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plates, i) => {
        return `
        <li>
        <input type = "checkbox" data-index="${i}" id="item${i}" ${plates.done ? "checked" : ""} />
        <label for = "item${i}">${plates.text}</label>
        </li>
        `
    }).join("");
}

function toggleDone(event) {
    if (!event.target.matches("input")) return;
    const index = event.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify((items)));
    populateList(items, itemList);
}

addItems.addEventListener("submit", addItem);
itemList.addEventListener("click", toggleDone);

populateList(items, itemList);
