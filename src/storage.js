import { allProjects } from "./index";

export function saveProjects() {
    for(let onePr in allProjects) {
        localStorage.setItem(`${onePr}`, JSON.stringify(allProjects[onePr]));
    }
}