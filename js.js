
const button = document.getElementById("add_button")
const taskInput = document.getElementById("input")
const taskList = document.getElementById("task_list")
const clearAllButton = document.getElementById("clear_all")
const taskCountText = document.getElementsByClassName("task-count-text")[0]


button.addEventListener("click", addTask);
taskList.addEventListener("click", DeleteOrEditTask)
clearAllButton.addEventListener("click", clearAll)

let tasks = [];
let isEdit = false
let id = null

let storageItems = localStorage.getItem("tasks")
if (storageItems) {
    tasks = JSON.parse(storageItems)
}

tasks.forEach(function (task) {
    // создаём новый элемент и в него засовываем текст из input
    const newTaskHTML = document.createElement("div")
    newTaskHTML.innerHTML = `
        <div id="${task.id}" class="task-list-item">
            <p class="task-list-item-text">${task.text}</p>
            <div class="div-for-button">
              <button class="edit-task-button btn-action" data-action="edit">
                <img src="edit-pencil.png" alt="edit" width="22" height="22">
              </button>
              <button class="clear-task-button btn-action" data-action="delete">
                <img src="trash-2-48.png" alt="delete" width="17" height="17"/>
              </button>
            </div>
        </div>
  `
    taskList.appendChild(newTaskHTML)
})

// функции
function addTask () {
    if (isEdit) {
        const taskTitle = document.querySelector(".task-list-item-text")
        taskTitle.textContent = taskInput.value
        isEdit = false
    } else {
        const taskText = taskInput.value

        const newTask = {
            id: Date.now(),
            text: taskText,
            done: false
        };

        tasks.push(newTask)

        saveToLocalStorage()

        const newTaskHTML = document.createElement("div")
        newTaskHTML.innerHTML = `
        <div id="${newTask.id}" class="task-list-item">
            <p class="task-list-item-text">${newTask.text}</p>
            <div class="div-for-button">
              <button class="edit-task-button btn-action" data-action="edit">
                <img src="edit-pencil.png" alt="edit" width="22" height="22"> 
              </button>
              <button class="clear-task-button btn-action" data-action="delete">
                <img src="trash-2-48.png" alt="delete" width="17" height="17"/>
              </button>
            </div>
        </div>
  `
        taskList.appendChild(newTaskHTML)

        // очищаем поле ввода и возвращаем на него фокус
        taskInput.value = ""
        taskInput.focus()
    }
}
function DeleteOrEditTask (event) {
    // проверяем, что клик будет по кнопке удалить
    if (event.target.dataset.action === "delete") {
        const parentNode = event.target.closest(".task-list-item")
        const id = Number(parentNode.id)

        const index = tasks.findIndex(function (task) {
            return task.id === id
        })

        // удаляем задачу из массива
        tasks.splice(index, 1)
        saveToLocalStorage()
        parentNode.remove()
    }

    if (event.target.dataset.action === "edit") {
        const parentNode = event.target.closest(".task-list-item")
        const taskTitle = parentNode.querySelector(".task-list-item-text")
        taskInput.value = taskTitle.textContent
        isEdit = true
        id = Number(parentNode.id)
    }
}
function clearAll (event) {
    tasks = []
    saveToLocalStorage()
    taskList.innerHTML = ""
}
function saveToLocalStorage () {
    localStorage.setItem("tasks", JSON.stringify(tasks))
    updateTaskCount()
}
function updateTaskCount () {
    taskCountText.innerText = `You have ${tasks.length} pending tasks`
}

updateTaskCount()