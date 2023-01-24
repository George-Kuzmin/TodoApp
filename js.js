
// находим элементы на странице
const button = document.getElementById("add_button")

const taskInput = document.getElementById("input")

const taskList = document.getElementById("task_list")

let tasks = [];

// добавляем задачу
button.addEventListener("click", addTask);

// удаляем задачу
taskList.addEventListener("click", deleteTask)

// функции
function addTask () {
    // достаём значение input
    const taskText = taskInput.value

    // описываем объект в виде задачи
    const taskObject = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    // добавим задачу в массив с задачами
    tasks.push(taskObject)
    console.log(tasks);


    // создаём новый элемент и в него засовываем текст из input
    const newTask = document.createElement("div")
    newTask.innerHTML = `
        <div class="task-list-item">
            <p class="task-list-item-text">${taskText.text}</p>
            <button class="clear-task-button btn-action">
              <img src="trash-2-48.png" alt="delete" width="17" height="17"/>
            </button>
        </div>
  `

    taskList.appendChild(newTask)

    // очищаем поле ввода и возвращаем на него фокус
    taskInput.value = ""
    taskInput.focus()
}

function deleteTask (event) {
    // проверяем, что клик будет по кнопке удалить
    if (event.target.dataset.action === "delete") {
        const parentNode = event.target.closest(".task-list-item")
        parentNode.remove()
    }
}

