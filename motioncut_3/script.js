document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            deleteTask(event.target.parentElement);
            saveTasks();
        } else if (event.target.classList.contains('edit-button')) {
            editTask(event.target.parentElement);
        } else if (event.target.classList.contains('complete')) {
            toggleComplete(event.target.parentElement);
            saveTasks();
        }
    });

    loadTasks();

    function addTask(text) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <button class="complete">Complete</button>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;
        taskList.appendChild(li);
    }

    function deleteTask(task) {
        taskList.removeChild(task);
    }

    function toggleComplete(task) {
        task.children[0].classList.toggle('completed');
    }

    function editTask(task) {
        const span = task.children[0];
        const newText = prompt('Edit the task:', span.textContent);
        if (newText !== null) {
            span.textContent = newText;
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach((task) => {
            tasks.push({
                text: task.children[0].textContent,
                completed: task.children[0].classList.contains('completed'),
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        savedTasks.forEach((task) => {
            addTask(task.text);
            if (task.completed) {
                toggleComplete(taskList.lastChild);
            }
        });
    }
});


