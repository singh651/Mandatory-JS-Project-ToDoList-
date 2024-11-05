const Todoinput = document.getElementById('to-do input')
const addtask = document.getElementById('add-task-btn')
const todolist = document.getElementById('to-do list')

let tasks = []

addtask.addEventListener('click',function(){
    let tasktext = Todoinput.value.trim();
    if(tasktext === ""){
        return;
    }

    const newtask = {
        id : Date.now(),
        text : tasktext,
        isCompleted : false,
    };
    tasks.push(newtask);
    Todoinput.value = "";
    console.log(tasks);
})