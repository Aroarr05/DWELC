//
/*

    3.Create a function that traverses the entire DOM from the body tag looking for the word
    "sex" or some other word from a list of taboo words.
    4.The text node where the word you are looking for appears must be replaced with "Blocked
    content", in bold type.
    
*/

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
