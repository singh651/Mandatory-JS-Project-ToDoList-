document.addEventListener("DOMContentLoaded", () => {

    const todoinput = document.getElementById("to-do-input");
    const addtask = document.getElementById("add-task-btn");
    const todolist = document.getElementById("to-do-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks from localStorage
    tasks.forEach((task) => rendertask(task));

    // Add a new task
    addtask.addEventListener('click', function () {
        let tasktext = todoinput.value.trim();
        if (tasktext === "") {
            return;
        }

        const newtask = {
            id: Date.now(),
            text: tasktext,
            completed: false // Set to 'completed' for consistency
        };

        tasks.push(newtask);
        savetasksinlocalstorage();
        rendertask(newtask); // Render the new task immediately
        todoinput.value = ""; // Clear input field
    });

    // Render individual task
    function rendertask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);

        // Add 'completed' class if task is marked as completed
        if (task.completed) {
            li.classList.add('completed');
        }

        // Task HTML structure
        li.innerHTML = `
            <span>${task.text}</span>
            <button>Delete</button>
        `;

        // **Toggle completed status** when clicking on the entire task (excluding the delete button)
        li.addEventListener('click', (e) => {
            // Check if the clicked element is the delete button; if so, do nothing
            if (e.target.tagName === 'BUTTON') return;

            // Toggle completion status
            task.completed = !task.completed;
            li.classList.toggle('completed');
            savetasksinlocalstorage(); // Save the updated task state
        });

        // Delete task when clicking the delete button
        // li.querySelector('button').addEventListener('click', (e) => {
        //     e.stopPropagation(); // Stop propagation to prevent toggling when deleting
        //     tasks = tasks.filter(t => t.id !== task.id); // Remove the task from the list
        //     savetasksinlocalstorage(); // Update localStorage
        //     todolist.removeChild(li); // Remove the task from the DOM
        // });

        todolist.appendChild(li); // Append the task to the list
    }

    // Save tasks to localStorage
    function savetasksinlocalstorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
