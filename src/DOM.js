import { Task, allProjects, makeTask } from "./index";

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

const projectElements = document.querySelectorAll('.projects p');
projectElements.forEach(projectEl => {
    projectEl.addEventListener('click', () => {
        const projectName = projectEl.textContent.trim();
        for(const pr in allProjects) {
            if(allProjects[pr].getName === projectName) {
                displayTasks(allProjects[pr]);
                break;
            }
        }
    });
});

let tasksDiv = document.querySelector(".tasks");
export function displayTasks(project) {
    tasksDiv.innerHTML = "";
    const taskList = project.getList;
    taskList.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.className = 'card';
        taskCard.innerHTML = `
            <p class="name" data-editable="true">${task.getName}</p>
            <div class="rest">
                <p class="due">Due: <span data-editable="true">${convertDate(task.getDate)}</span></p>
                <p class="priority">Priority: 
                    <span class="priority-value" style="display: inline-block;">
                        ${task.getPriority}
                    </span>
                    <select class="priority-select" style="display: none;">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </p>
                <div class="imgs">
                    <img src="https://www.svgrepo.com/show/522527/edit-3.svg" alt="edit" class="edit-btn">
                    <img src="https://www.svgrepo.com/show/524417/check-square.svg" alt="save" class="save-btn" style="display: none;">
                    <img src="https://www.svgrepo.com/show/500535/delete.svg" alt="delete" class="delete-btn">
                </div>
            </div>
            <p class="description" data-editable="true">${task.getDesc}</p>
        `;

        const deleteBtn = taskCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            project.getList.splice(index, 1);
            
            if (project.getName !== "Default") {
                const allTasksIndex = allProjects.allTasks.getList.findIndex(t => 
                    t.getName === task.getName && 
                    t.getDate === task.getDate && 
                    t.getDesc === task.getDesc
                );
                if (allTasksIndex !== -1) {
                    allProjects.allTasks.getList.splice(allTasksIndex, 1);
                }
            }
            
            if (project.getName === "Default") {
                for(const pr in allProjects) {
                    if(allProjects[pr].getName === task.getProject) {
                        const projectTaskIndex = allProjects[pr].getList.findIndex(t => 
                            t.getName === task.getName && 
                            t.getDate === task.getDate && 
                            t.getDesc === task.getDesc
                        );
                        if (projectTaskIndex !== -1) {
                            allProjects[pr].getList.splice(projectTaskIndex, 1);
                        }
                    }
                }
            }
            
            displayTasks(project);
        });

        const editBtn = taskCard.querySelector('.edit-btn');
        const saveBtn = taskCard.querySelector('.save-btn');
        const priorityValue = taskCard.querySelector('.priority-value');
        const prioritySelect = taskCard.querySelector('.priority-select');
        const editableElements = taskCard.querySelectorAll('[data-editable="true"]');
        
        editBtn.addEventListener('click', () => {
            editBtn.style.display = 'none';
            saveBtn.style.display = 'block';
            
            priorityValue.style.display = 'none';
            prioritySelect.style.display = 'inline-block';
            prioritySelect.value = task.getPriority;

            editableElements.forEach(element => {
                const value = element.textContent;
                if (element.classList.contains('name')) {
                    element.innerHTML = `<input type="text" class="edit-input name-input" value="${value}">`;
                } else if (element.classList.contains('description')) {
                    element.innerHTML = `<textarea class="edit-input desc-input">${value}</textarea>`;
                }
            });

            const dueElement = taskCard.querySelector('.due span');
            const originalDate = task.getDate;
            dueElement.innerHTML = `<input type="date" class="edit-input date-input" value="${originalDate}">`;
        });

        saveBtn.addEventListener('click', () => {
            const newName = taskCard.querySelector('.name-input')?.value || task.getName;
            const newDesc = taskCard.querySelector('.desc-input')?.value || task.getDesc;
            const newDate = taskCard.querySelector('.date-input')?.value || task.getDate;
            const newPriority = prioritySelect.value;

            const updatedTask = new Task(newName, newDesc, newDate, newPriority, task.getProject);
            project.getList[index] = updatedTask;

            if (task.getProject !== "Default") {
                const allTasksIndex = allProjects.allTasks.getList.findIndex(t => 
                    t.getName === task.getName && 
                    t.getDate === task.getDate && 
                    t.getDesc === task.getDesc
                );
                if (allTasksIndex !== -1) {
                    allProjects.allTasks.getList[allTasksIndex] = updatedTask;
                }
            }

            displayTasks(project);
        });

        tasksDiv.appendChild(taskCard);
    });
}

projectElements.forEach(projectEl => {
    projectEl.addEventListener('click', () => {
        projectElements.forEach(p => p.classList.remove('active'));
        projectEl.classList.add('active');
    });
});