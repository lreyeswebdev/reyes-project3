"use strict"

// HTML elements
const dateElement = document.getElementById("date");
const inputTask = document.getElementById("inputTask");
const addBtn = document.getElementById("addBtn");

// Date

let options = { weekday:'long', month:'short', day:'numeric'};

let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);