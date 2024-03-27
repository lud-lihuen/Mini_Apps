document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Función para añadir una tarea a la lista
  function addTask(taskText) {
    let taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item');

    let taskDiv = document.createElement('div');
    taskDiv.classList.add('item-container');
    taskItem.appendChild(taskDiv);

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('mr-2');
    taskDiv.appendChild(checkbox);

    let taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;
    taskDiv.appendChild(taskTextSpan);

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'btn-delete', 'ml-3');
    deleteBtn.innerHTML = '🞬';
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
  }

  // Función para guardar una tarea en el Local Storage
  function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ description: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Función para cargar las tareas desde el Local Storage al cargar la página
  function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
      addTask(task.description);
      if (task.completed) {
        let taskItem = taskList.lastChild;
        taskItem.classList.add('completed');
        taskItem.firstChild.classList.add('completed');
        taskItem.firstChild.firstChild.checked = true;
      }
    });
  }

  // Función para eliminar una tarea del Local Storage
  function deleteTaskFromLocalStorage(taskItem) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskIndex = Array.from(taskList.children).indexOf(taskItem);
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Función para actualizar el estado (checked/unchecked) de una tarea en el Local Storage
  function updateTaskInLocalStorage(taskItem) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskIndex = Array.from(taskList.children).indexOf(taskItem);
    tasks[taskIndex].completed = taskItem.classList.contains('completed');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Cargar las tareas almacenadas en el Local Storage al cargar la página
  loadTasksFromLocalStorage();

  // Evento al hacer clic en el botón "Añadir"
  addTaskBtn.addEventListener('click', function () {
    let taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      saveTaskToLocalStorage(taskText);
      // Limpiar el campo de entrada de tareas
      taskInput.value = '';
    }
  });

  // Evento al presionar la tecla "Enter" en el campo de entrada de tareas
  taskInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      // Simular clic en el botón "Añadir" al presionar "Enter"
      addTaskBtn.click();
    }
  });

  // Evento de check/uncheck de una tarea
  taskList.addEventListener('change', function (event) {
    let checkbox = event.target;
    if (checkbox.type === 'checkbox') {
      // Obtener los elementos padre div y li de la tarea y cambiar su estado completado
      let taskDiv = checkbox.parentNode;
      let taskItem = checkbox.closest('li')
      taskDiv.classList.toggle('completed');
      taskItem.classList.toggle('completed');
      // Actualizar el estado de la tarea en el Local Storage
      updateTaskInLocalStorage(taskItem);
    }
  });

  // Evento al hacer clic en el botón "Borrar" de una tarea
  taskList.addEventListener('click', function (event) {
    let deleteBtn = event.target;
    if (deleteBtn.classList.contains('btn-delete')) {
      // Obtener el elemento padre (li) de la tarea y eliminarla
      let taskItem = deleteBtn.closest('li');
      deleteTaskFromLocalStorage(taskItem);
      taskItem.remove();
    }
  });
});
