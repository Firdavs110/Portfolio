
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Vazifalarni saqlash
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



function showTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = "task";

        const left = document.createElement("div");
        left.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function () {
            completeTask(index);
        });


        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        if (task.completed) {
            text.classList.add("completed");
        }


        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "🗑";

        deleteBtn.addEventListener("click", function () {
            deleteTask(index);
        });


        left.appendChild(checkbox);
        left.appendChild(text);

        li.appendChild(left);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateCount();
}


// Yangi vazifa qo‘shish
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Avval vazifa yozing!");
        return;
    }


    tasks.push({
        text: text,
        completed: false
    });


    taskInput.value = "";

    saveTasks();

    showTasks();
}


// Vazifani bajarilgan/bajarilmagan qilish
function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    showTasks();
}


// Vazifani o‘chirish
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    showTasks();
}


// Qancha vazifa qolganini hisoblash
function updateCount() {

    const unfinished = tasks.filter(function (task) {
        return !task.completed;
    }).length;


    taskCount.textContent =
        `${unfinished} ta vazifa qoldi`;
}


// Barcha vazifalarni o‘chirish
clearBtn.addEventListener("click", function () {

    if (tasks.length === 0) {
        return;
    }


    const confirmDelete = confirm(
        "Hamma vazifalarni o‘chirmoqchimisiz?"
    );


    if (!confirmDelete) {
        return;
    }


    tasks = [];

    saveTasks();

    showTasks();
});


// Qo‘shish tugmasi
addBtn.addEventListener("click", addTask);


// Enter bosilganda vazifa qo‘shish
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Sahifa ochilganda vazifalarni chiqarish
showTasks();
