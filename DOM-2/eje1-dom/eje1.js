
function obtenerInformacionNodo(nodo) {

    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = ""; 

    const padre = nodo.parentElement;
    if (padre) {
        infoDiv.innerHTML += `<p>Padre: ${padre.tagName} - ID: ${padre.id || 'sin id'}</p>`;
    } else {
        infoDiv.innerHTML += `<p>Padre: No tiene padre</p>`;
    }

    const hermanos = [...nodo.parentElement?.children].filter(h => h !== nodo);
    if (hermanos.length > 0) {
        infoDiv.innerHTML += `<p>Hermanos: ${hermanos.map(h => `${h.tagName} - ID: ${h.id || 'sin id'}`).join(', ')}</p>`;
    } else {
        infoDiv.innerHTML += `<p>Hermanos: No tiene hermanos</p>`;
    }

    const anterior = nodo.previousElementSibling;
    if (anterior) {
        infoDiv.innerHTML += `<p>Hermano anterior: ${anterior.tagName} - ID: ${anterior.id || 'sin id'}</p>`;
    } else {
        infoDiv.innerHTML += `<p>Hermano anterior: No tiene hermano anterior</p>`;
    }


    const siguiente = nodo.nextElementSibling;
    if (siguiente) {
        infoDiv.innerHTML += `<p>Hermano siguiente: ${siguiente.tagName} - ID: ${siguiente.id || 'sin id'}</p>`;
    } else {
        infoDiv.innerHTML += `<p>Hermano siguiente: No tiene hermano siguiente</p>`;
    }

    const abuelo = padre?.parentElement;
    if (abuelo) {
        infoDiv.innerHTML += `<p>Abuelo: ${abuelo.tagName} - ID: ${abuelo.id || 'sin id'}</p>`;
    } else {
        infoDiv.innerHTML += `<p>Abuelo: No tiene abuelo</p>`;
    }

    const tios = [...padre?.parentElement?.children].filter(h => h !== padre);
    if (tios.length > 0) {
        infoDiv.innerHTML += `<p>Tíos: ${tios.map(t => `${t.tagName} - ID: ${t.id || 'sin id'}`).join(', ')}</p>`;
    } else {
        infoDiv.innerHTML += `<p>Tíos: No tiene tíos</p>`;
    }

    const primos = tios.map(t => [...t.children]).flat();
    if (primos.length > 0) {
        infoDiv.innerHTML += `<p>Primos: ${primos.map(p => `${p.tagName} - ID: ${p.id || 'sin id'}`).join(', ')}</p>`;
    } else {
        infoDiv.innerHTML += `<p>Primos: No tiene primos</p>`;
    }

    const hijos = [...nodo.children];
    if (hijos.length > 0) {
        infoDiv.innerHTML += `<p>Hijos: ${hijos.map(h => `${h.tagName} - ID: ${h.id || 'sin id'}`).join(', ')}</p>`;
    } else {
        infoDiv.innerHTML += `<p>Hijos: No tiene hijos</p>`;
    }

    const nietos = hijos.map(h => [...h.children]).flat();
    if (nietos.length > 0) {
        infoDiv.innerHTML += `<p>Nietos: ${nietos.map(n => `${n.tagName} - ID: ${n.id || 'sin id'}`).join(', ')}</p>`;
    } else {
        infoDiv.innerHTML += `<p>Nietos: No tiene nietos</p>`;
    }
}

document.getElementById('showInfoButton').addEventListener('click', () => {
    const nodoSeleccionado = document.getElementById('child2');
    obtenerInformacionNodo(nodoSeleccionado);
});
