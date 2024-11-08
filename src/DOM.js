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

    return { nameInput, nameDescription, nameDueDate, taskPriority };
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