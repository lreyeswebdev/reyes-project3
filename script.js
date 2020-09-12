"use strict"

// HTML elements
const dateElement = document.getElementById("date");
const inputTask = document.getElementById("inputTask");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

// Date
let options = { weekday:'long', month:'short', day:'numeric'};

let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Variables
let LIST, id;

// Get item from localstorage
let data = localStorage.getItem("TASK");

// Check if data is not empty
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

// Load items
function loadList(array) {
    array.forEach(function(item) {
        addTask(item.name, item.id, item.done, item.trash);
    });
}

// Add Tasks
function addTask(task, id, done, trash) {
    const item = `<li class="item">
                <p class="">${task}</p>
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

addBtn.onclick = () => {
    const task = inputTask.value;

    if(task) {
        addTask(task, id, false, false);

        LIST.push({
            name : task,
            id : id,
            done: false,
            trash : false
        });

        localStorage.setItem("TASK", JSON.stringify(LIST));

        id++;
    }
    inputTask.value = "";
}