let taskId = 0;  // To generate unique IDs for each task

// Add a new task
function addTask() {
  const taskText = document.getElementById('newTask').value;
  
  if (taskText === '') return;

  // Create a new task element
  const task = document.createElement('div');
  task.classList.add('task');
  task.textContent = taskText;
  
  // Assign a unique ID to each task
  task.setAttribute('id', `task-${taskId++}`);
  task.setAttribute('draggable', 'true');

  // Add drag event listeners
  task.addEventListener('dragstart', dragStart);
  
  // Add delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = () => task.remove();
  task.appendChild(deleteBtn);

  // Add the task to the "To Do" box
  document.getElementById('todo').appendChild(task);
  
  // Clear the input field
  document.getElementById('newTask').value = '';
}

// Handle the start of dragging
function dragStart(event) {
  event.dataTransfer.setData('task-id', event.target.id);  // Save the task ID
}

// Allow the box to receive the dragged task
function dragOver(event) {
  event.preventDefault();
}

// Handle dropping the task into a new box
function dropTask(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData('task-id');  // Get the task ID
  const task = document.getElementById(taskId);  // Find the task element

  // Append the task to the current box
  if (event.target.classList.contains('box')) {
    event.target.appendChild(task);
  } else if (event.target.parentElement.classList.contains('box')) {
    event.target.parentElement.appendChild(task);
  }
}

// Add drag event listeners to each box
document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('dragover', dragOver);
  box.addEventListener('drop', dropTask);
});
