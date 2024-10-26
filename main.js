let input = document.querySelector("#input");
let add = document.querySelector("#add");
let tasksDiv = document.querySelector(".tasks");

let tasksArr = [];

if (window.localStorage.getItem("tasks")) {
    tasksArr = JSON.parse(localStorage.getItem("tasks"));
}

getTaskLocalStorage();

add.addEventListener("click", () => {
    if (input.value !== "") {
        // Add Task To Array Of Tasks
        addTask(input.value);
        input.value = "";
    }
})

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value !== "") {
        addTask(input.value);
        input.value = "";
    }
});

function addTask(e) {
    const task = {
        id: Date.now(),
        title: e,
        completed: false,
    };

    tasksArr.push(task);

    // Add tasks to main page
    tasksPage(tasksArr);
    tasksLocalStorage(tasksArr);
}

function tasksPage(eArr) {
    tasksDiv.innerHTML = "";

    eArr.forEach(task => {
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id", task.id);
        if (task.completed) {
            div.className = "task done";
        }

        let span = document.createElement("span");
        span.className = "del";
        span.append(document.createTextNode("Delete"));

        div.append(document.createTextNode(task.title), span);
        tasksDiv.append(div);

    });
}

function tasksLocalStorage(arr) {
    window.localStorage.setItem("tasks", JSON.stringify(arr));
}

function getTaskLocalStorage() {
    if (window.localStorage.getItem("tasks")) {
        tasksPage(tasksArr);
    }
}

tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
        deleteFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    }

    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
        toggleStatus(e.target.getAttribute("data-id"));
    }
})

function deleteFromLocalStorage(e) {
    tasksArr = tasksArr.filter(task => task.id != e);
    tasksLocalStorage(tasksArr);
}

function toggleStatus(ele) {
    tasksArr.forEach((e) => {
        if (e.id == ele) {
            e.completed == false ? e.completed = true : e.completed = false;
        }
    })
    tasksLocalStorage(tasksArr);
}