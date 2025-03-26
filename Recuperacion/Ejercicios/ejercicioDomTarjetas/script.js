function createTask(title) {
    
    let task = document.createElement("div");
    let titulo = document.createElement("p");
    let close = document.createElement("p");        
   
    let texto = document.createTextNode(title);
    let x = document.createTextNode("X");

    titulo.append(texto);
    close.append(x);

    close.addEventListener("click",deleteTask);

    task.classList.add("task");
    task.append(titulo);
    task.append(close);
    task.draggable = true;   

    task.addEventListener("dragstart", event => {
        console.log("dragStart");
        event.dataTransfer.setData("name",event.target.children[0].textContent);
        event.target.setAttribute("id","draggable");
        console.log(event.target.children[0].textContent);
    });
    
    return task;
}

document.querySelector(".btn").addEventListener("click", event => {
    
    let taskName = document.querySelector("input").value;

    if (!taskName) {
        alert("No hay nada que añadir");
    } else {        
        document.querySelector(".todo .tasks").append(createTask(taskName));
        document.querySelector("input").value = "";
    }   

});

function deleteTask(event) {
  event.target.parentElement.remove();
}


let borrarXs = document.getElementsByClassName("close");

Array.from(borrarXs).forEach(element => {
    element.addEventListener("click",deleteTask);
});


let tasks = document.querySelectorAll(".task");

tasks.forEach( element => {
    element.draggable = true;
    element.addEventListener("dragstart", event => {
        event.dataTransfer.setData("name",event.target.children[0].textContent);
        event.target.setAttribute("id","draggable");
    });
    
});

let tasks_list = document.querySelectorAll(".tasks");


tasks_list.forEach( lista => {

    lista.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    lista.addEventListener("drop", function(event) {
        event.preventDefault();
        let name = event.dataTransfer.getData("name");
        event.target.closest(".tasks").append(createTask(name));
        document.getElementById("draggable").remove();        
    });
});
