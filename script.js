"use strict"

// HTML elements
const dateElement = document.getElementById("date");
const inputTask = document.getElementById("inputTask");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const clearBtn = document.getElementById("clearBtn");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

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

    if(trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                <i class="fas ${DONE}" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${task}</p>
                <i class="fas fa-trash-alt" job="delete" id="${id}"></i>
                </li>
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// Add Task on button click
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

// Completed Task
function completeTask(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove Task
function removeTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Event listerner for task completion or removal
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob === "complete") {
        completeTask(element);
    } else if (elementJob === "delete") {
        removeTask(element);
    }

    localStorage.setItem("TASK", JSON.stringify(LIST));
});

// Clear all tasks
clearBtn.onclick = () => {
    localStorage.clear();
    location.reload();
};