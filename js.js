
// находим элементы на странице
const button = document.getElementById("add_button")

const taskInput = document.getElementById("input")

const taskList = document.getElementById("task_list")

// устанавливаем наблюдение за кнопкой (add Event listener + call back function)
button.addEventListener("click", function () {
    // достаём значение input
    const taskText = taskInput.value

    // создаём новый элемент и в него засовываем текст из input
    const newTask = document.createElement("div")
    newTask.innerHTML = `<div class="task-list-item"><p class="task-list-item-text">${taskText}</p></div>`

    
    taskList.appendChild(newTask)

    // очищаем поле ввода и возвращаем на него фокус
    taskInput.value = ""
    taskInput.focus()
})

