import "./styles.css"
import "./DOM.js"
import { getInputs, isInputEmpty, closeModal, clearInputs } from "./DOM.js";

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

const allProjects = {
    allTasks: new Project("Default"),
    workPr: new Project("Work"),
    personalPr: new Project("Personal"),
    shoppingPr: new Project("Shopping"),
    travelPr: new Project("Travel"),
    homePr: new Project("Home"),
    financePr: new Project("Finance")
}

class Task {
    constructor(name, description, dueDate, priority, project) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
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
                                 getInputs().taskPriority);
        allProjects.allTasks.addTaskToList(newTask);
        console.log(allProjects.allTasks.getList);
        closeModal();
        clearInputs();
    };
};
