import { makeTask } from "./index";

const newTaskBtn = document.querySelector(".new");
const modal = document.querySelector("dialog");
newTaskBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

export function closeModal() {
    modal.style.display = "none";
}

const closeBtn = document.querySelector("#close");
closeBtn.addEventListener("click", () => {
    closeModal();
});

export function getInputs() {
    const nameInput = document.querySelector("#input-name").value;
    const nameDescription = document.querySelector("#input-desc").value;
    const nameDueDate = document.querySelector("#input-date").value;
    const taskPriority = document.querySelector('input[name="priority"]:checked')?.value;
    const prName = document.querySelector("#pr-select").value;

    return { nameInput, nameDescription, nameDueDate, taskPriority, prName };
};

const addTaskBtn = document.querySelector("#add");
addTaskBtn.addEventListener("click", () => {
    makeTask();
});

export function isInputEmpty(name, desc, date, prior) {
    if(name == "" || desc == "" || date == "" || (prior != "High" && prior != "Medium" && prior != "Low")) {
        return true;
    } else {
        return false;
    };
};

export function clearInputs() {
    document.querySelector("#input-name").value = "";
    document.querySelector("#input-desc").value = "";
    document.querySelector("#input-date").value = "";
    document.querySelectorAll('input[name="priority"]').forEach(check => {
        check.checked = false;
    });
}

function convertDate(date) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const monthNum = date.split("-")[1];
    let thisMonth = null;
    if(monthNum.split("")[0] == 0) {
        thisMonth = months[monthNum.split("")[1] - 1];
    } else {
        thisMonth = months[monthNum - 1];
    }
    const thisDay = date.split("-")[2];

    return thisMonth + " " + thisDay;
}

let tasksDiv = document.querySelector(".tasks");
export function displayTasks(project) {
    tasksDiv.innerHTML = "";
    const taskList = project.getList;
    taskList.forEach(task => {
        tasksDiv.innerHTML = tasksDiv.innerHTML + `
            <div class="card">
                <p class="name">${task.getName}</p>
                <div class="rest">
                    <p class="due">Due: ${convertDate(task.getDate)}</p>
                    <p class="priority">Priority: ${task.getPriority}</p>
                    <div class="imgs">
                        <img src="https://www.svgrepo.com/show/522527/edit-3.svg" alt="edit">
                        <img src="https://www.svgrepo.com/show/500535/delete.svg" alt="delete">
                    </div>
                </div>
                <p class="description">${task.getDesc}</p>
            </div>
        `
    });
};