document.addEventListener("DOMContentLoaded", () => {

const todoinput = document.getElementById("to-do-input");
const addtask = document.getElementById("add-task-btn");
const todolist = document.getElementById("to-do-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => rendertask(task));

addtask.addEventListener('click',function(){
    let tasktext = todoinput.value.trim();
    if(tasktext === ""){
        return;
    }

    const newtask = {
        id : Date.now(),
        text : tasktext,
        isCompleted : false,
    };
    tasks.push(newtask);
    savetasksinlocalstorage();
    todoinput.value = "";
    console.log(tasks);
});

function rendertask(task){
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `<span>${task.text}</span>
    <button>Delete</button>`;
    todolist.appendChild(li);
}

function savetasksinlocalstorage(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
};

})
