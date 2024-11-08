import "./styles.css"
import "./DOM.js"

const newTaskBtn = document.querySelector(".new");
const modal = document.querySelector("dialog");
newTaskBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

const closeBtn = document.querySelector("#close");
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});