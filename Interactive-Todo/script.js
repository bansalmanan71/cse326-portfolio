// 1. DOM Selection
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 2. Load existing tasks from Local Storage, or start with an empty array
// JSON.parse converts the saved string back into a JavaScript array
let tasks = JSON.parse(localStorage.getItem('savedTasks')) || [];

// Function to save the current array to Local Storage
function saveToLocalStorage() {
    localStorage.setItem('savedTasks', JSON.stringify(tasks));
}

// Function to draw the tasks on the screen (DOM Manipulation)
function renderTasks() {
    // Clear the current list so we don't get duplicates when redrawing
    taskList.innerHTML = '';

    // Array Operation: Loop through each task
    tasks.forEach((task, index) => {
        // Create HTML elements
        const li = document.createElement('li');
        const span = document.createElement('span');
        const deleteBtn = document.createElement('button');

        // Set up the task text
        span.textContent = task.text;
        span.className = 'task-text';

        // Check if it's completed and apply the CSS class if true
        if (task.completed === true) {
            li.classList.add('completed');
        }

        // Event Handling: Click text to cross it off
        span.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed; // Toggle true/false
            saveToLocalStorage();
            renderTasks(); // Redraw the list to show the change
        });

        // Set up the delete button
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        // Event Handling: Click button to delete task
        deleteBtn.addEventListener('click', () => {
            // Array Operation: Remove 1 item at this specific index
            tasks.splice(index, 1);
            saveToLocalStorage();
            renderTasks(); // Redraw the list
        });

        // Assemble the list item and put it on the page
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Event Handling: Add a new task when the button is clicked
addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    
    if (text !== '') {
        // Array Operation: Add new task object to the end of the array
        tasks.push({
            text: text,
            completed: false
        });
        
        taskInput.value = ''; // Clear the input box
        saveToLocalStorage();
        renderTasks();
    }
});

// 3. Initial render when the page first loads
renderTasks();
