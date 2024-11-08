import { makeTask } from "./index";

const newTaskBtn = document.querySelector(".new");
const modal = document.querySelector("dialog");
newTaskBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

const closeBtn = document.querySelector("#close");
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
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