
document.querySelector('#agregarBtn').addEventListener('click', function() {
    
    let texto = document.querySelector('#textoItem').value;

    if (texto.trim() === "") {
        alert("Por favor, ingresa un texto para el ítem.");
        return;
    }

    let lista = document.querySelector('ol');

    if (!lista) {
        lista = document.createElement('ol');
        document.querySelector('#contenedorLista').appendChild(lista);
    }

    let nuevoItem = document.createElement('li');
    nuevoItem.textContent = texto;

    lista.insertBefore(nuevoItem, lista.firstChild);

    document.querySelector('#textoItem').value = "";
});
