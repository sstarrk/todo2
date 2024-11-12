import "./styles.css"
import "./DOM.js"
import { getInputs, isInputEmpty, closeModal, clearInputs, displayTasks } from "./DOM.js";

class Project {
    constructor(name) {
        this._name = name;
        this._tasks = [];
    }

    get getName() {
        return this._name;
    }

    get getList() {
        return this._tasks;
    }

    addTaskToList(task) {
        this._tasks.push(task);
    };
};

export const allProjects = {
    allTasks: new Project("Default"),
    workPr: new Project("Work"),
    personalPr: new Project("Personal"),
    shoppingPr: new Project("Shopping"),
    travelPr: new Project("Travel"),
    homePr: new Project("Home"),
    financePr: new Project("Finance")
};

export class Task {
    constructor(name, description, dueDate, priority, project) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    get getName() {
        return this.name;
    }
    
    get getDesc() {
        return this.description;
    }
    
    get getDate() {
        return this.dueDate;
    }

    get getPriority() {
        return this.priority;
    }

    get getProject() {
        return this.project;
    }
}

export function makeTask() {
    getInputs();
    if(isInputEmpty(getInputs().nameInput, 
                    getInputs().nameDescription, 
                    getInputs().nameDueDate, 
                    getInputs().taskPriority)) {
        
    } else {
        const newTask = new Task(getInputs().nameInput, 
                                 getInputs().nameDescription, 
                                 getInputs().nameDueDate, 
                                 getInputs().taskPriority,
                                 getInputs().prName);
        for(const pr in allProjects) {
            if(allProjects[pr].getName == newTask.getProject) {
                allProjects[pr].addTaskToList(newTask);
            }
        }
        if(newTask.getProject != "Default") {
            allProjects.allTasks.addTaskToList(newTask);
        }
        closeModal();
        clearInputs();
        displayTasks(allProjects.allTasks);
    };
};
