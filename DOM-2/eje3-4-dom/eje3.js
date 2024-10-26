
const palabrasProhibidas = ["sexo", "ppp", "prohibido"]; 

function bloquearPalabrasProhibidas() {
    const textoNodos = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

    let nodoActual;
    while (nodoActual = textoNodos.nextNode()) {
        palabrasProhibidas.forEach(palabra => {
            
            if (nodoActual.nodeValue.toLowerCase().includes(palabra)) {
                const contenidoBloqueado = document.createElement("strong");
                contenidoBloqueado.textContent = "Contenido bloqueado";
                
                nodoActual.parentNode.replaceChild(contenidoBloqueado, nodoActual);
            }
        });
    }
}
document.addEventListener("DOMContentLoaded", bloquearPalabrasProhibidas);
