document.getElementById("representar").addEventListener("click", event => {

    let filas = document.querySelectorAll("tbody tr");

    for (let index = 0; index < filas.length; index++) {
        
        let celdas = filas[index].children;

        let graficas = document.querySelector(".graphics > div:nth-child("+(index+1)+")");

        for (let j = 1; j < celdas.length; j++) {
            
            let altura =  parseInt(celdas[j].textContent);

            graficas.children[j-1].style.height = altura+"px";
            graficas.children[j-1].title="Cantidad="+altura;
        }
        
    }

});