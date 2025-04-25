document.addEventListener("DOMContentLoaded",()=>{

    document.querySelector(".btn").addEventListener("click", manejarTareas);

    let tasksList = document.querySelectorAll(".tasks");
    
    tasksList.forEach((lista) => {
        lista.addEventListener("dragover", 
        function (event) {
            event.preventDefault(); 
        });
        lista.addEventListener("drop", drop);
    });
    
    let tasks = document.querySelectorAll(".task");
    
    tasks.forEach((task) => {
        task.draggable = true;
        task.addEventListener("dragstart", manejarEvento);
    });
})

function createTask(title) {
    let task = document.createElement("div");
    let titulo = document.createElement("p");
    let close = document.createElement("p");

    let texto = document.createTextNode(title);
    let x = document.createTextNode("X");
 
    titulo.append(texto);
    close.append(x);
    
    close.addEventListener("click", deleteTask);
    
    task.classList.add("task");
    task.append(titulo);
    task.append(close);
    task.draggable = true;
    
    task.addEventListener("dragstart", manejarEvento);
    
    return task;
}

let daggedTask = null;

function manejarEvento(event) {
    daggedTask = event.target;
    const taskTitle = event.target.children[0].textContent;
    event.dataTransfer.setData("name", taskTitle);
}

function manejarTareas (event){
    let taskName = document.querySelector("input").value;

    if (!taskName) {
        alert("No hay nada que añadir");
    } else {
        addTaskToList(taskName);
        document.querySelector("input").value = "";
    }
}

function deleteTask(event) {
    event.target.parentElement.remove();
}

function addTaskToList(taskName) {
    const taskElement = createTask(taskName);
    document.querySelector(".todo .tasks").append(taskElement);
}

function drop(event) {
    event.preventDefault();

    const targetaColumn = event.target.parentNode; 
    
    const principalColumn = daggedTask.parentNode.parentNode; 
    
    if (principalColumn.classList.contains("todo") && targetaColumn.classList.contains("inprocess")) {
        targetaColumn.querySelector(".tasks").appendChild(daggedTask);
    }
    
    if (principalColumn.classList.contains("inprocess") && targetaColumn.classList.contains("done")) {
        targetaColumn.querySelector(".tasks").appendChild(daggedTask);
    }
}
