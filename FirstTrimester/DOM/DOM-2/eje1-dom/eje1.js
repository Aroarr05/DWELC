//
/*

Given these html structures, by clicking the highlighted nodes show the tag and id of:
1. The father
2. All the siblings
3. The previous sibling
4. The next sibling
5. The grandfather
6. Grandfather's siblings
7. Father's siblings
8. Cousins
9. Children
10. Grandchildren
The aim of the exercise is to traverse the DOM dynamically without knowing whether what we
are looking for exists or not.
Therefore, if the node to be searched for does not exist, an appropriate message should be
displayed, without any error occurring.

*/

// Función principal que se ejecuta cuando ocurre un clic en el documento
function infofamilia(event) {
    // Encuentra el elemento más cercano con etiqueta 'div' o 'tr' desde el evento de clic
    const seleccion = event.target.closest('div, tr');
    // Si se encuentra un elemento válido, se maneja su relación familiar
    seleccion ? manejarFamilia(seleccion) : console.log("El elemento seleccionado no existe."); // Operador ternario como if/else
}

// Función que maneja las relaciones familiares del elemento seleccionado
const manejarFamilia = (seleccion) => {
    // Determina si es una fila (tr) o un elemento genérico, y muestra información inicial
    seleccion.tagName === 'TR' 
        ? showInfo("Fila seleccionada", seleccion) 
        : showInfo("Elemento seleccionado", seleccion);

    // Obtener el padre del elemento seleccionado
    const padre = seleccion.parentElement;
    // Obtener el abuelo del elemento seleccionado (si existe)
    const abuelo = padre ? padre.parentElement : null;

    // Mostrar información del padre
    showInfo("Padre", padre);

    // Mostrar información de todos los hermanos del elemento seleccionado
    mostrarHermanos(seleccion, padre);

    // Mostrar información del hermano anterior y posterior (si existen)
    showInfo("Hermano anterior", seleccion.previousElementSibling);
    showInfo("Hermano posterior", seleccion.nextElementSibling);

    // Mostrar información del abuelo
    showInfo("Abuelo", abuelo);

    // Mostrar información de los hermanos del abuelo (los tíos)
    const tios = mostrarTios(abuelo, padre);

    // Mostrar información de los primos (hijos de los tíos)
    mostrarPrimos(tios);

    // Mostrar información de los hijos del elemento seleccionado
    const hijos = mostrarHijos(seleccion);

    // Mostrar información de los nietos (hijos de los hijos)
    mostrarNietos(hijos);
}

// Función para mostrar todos los hermanos del elemento seleccionado
function mostrarHermanos(seleccion, padre) {
    console.log("Hermanos -->");
    // Verifica que el elemento tiene un padre con más de un hijo
    if (padre && padre.children.length > 1) {
        // Itera sobre los hijos del padre
        Array.from(padre.children).forEach(hermano => {
            // Excluye al elemento seleccionado de la lista de hermanos
            if (hermano != seleccion) {
                showInfo("Hermano", hermano);
            }
        });
    } else {
        console.log("No tiene hermanos.");
    }
}

// Función para mostrar los tíos del elemento (hermanos del abuelo excluyendo al padre)
function mostrarTios(abuelo, padre) {
    console.log("Tíos -->");
    if (abuelo) {
        // Filtra los hijos del abuelo para excluir al padre
        const tios = Array.from(abuelo.children).filter(tio => tio != padre);
        if (tios.length > 0) {
            // Muestra información de cada tío
            tios.forEach(tio => showInfo("Tío", tio));
        } else {
            console.log("No tiene tíos.");
        }
        return tios; // Retorna la lista de tíos
    } else {
        console.log("No tiene tíos.");
        return []; // Retorna una lista vacía si no hay abuelo
    }
}

// Función para mostrar los primos (hijos de los tíos)
function mostrarPrimos(tios) {
    console.log("Primos -->");
    let hayprimos = false; // Bandera para verificar si hay primos
    tios.forEach(tio => {
        // Obtiene los hijos de cada tío
        const primos = Array.from(tio.children);
        if (primos.length > 0) {
            hayprimos = true;
            // Muestra información de cada primo
            primos.forEach(primo => showInfo("Primo", primo));
        }
    });
    if (!hayprimos) {
        console.log("No tiene primos.");
    }
}

// Función para mostrar los hijos del elemento seleccionado
function mostrarHijos(seleccion) {
    console.log("Hijos --> ");
    // Obtiene la lista de hijos del elemento seleccionado
    const hijos = Array.from(seleccion.children);
    if (hijos.length > 0) {
        // Muestra información de cada hijo
        hijos.forEach(hijo => showInfo("Hijo", hijo));
    } else {
        console.log("No tiene hijos.");
    }
    return hijos; // Retorna la lista de hijos para su uso posterior
}

// Función para mostrar los nietos (hijos de los hijos)
function mostrarNietos(hijos) {
    console.log("Nietos -->");
    let haynietos = false; // Bandera para verificar si hay nietos
    hijos.forEach(hijo => {
        // Obtiene la lista de hijos de cada hijo (nietos)
        const nietos = Array.from(hijo.children);
        if (nietos.length > 0) {
            haynietos = true;
            // Muestra información de cada nieto
            nietos.forEach(nieto => showInfo("Nieto", nieto));
        }
    });
    if (!haynietos) {
        console.log("No tiene nietos.");
    }
}

// Función para mostrar información básica de un elemento del DOM
function showInfo(tipo, miembro) {
    if (miembro) {
        // Muestra la etiqueta del elemento y su ID (si tiene)
        console.log(`${tipo} --> Etiqueta: ${miembro.tagName}, ID: ${miembro.id || 'Sin ID'}`);
    } else {
        // Indica si el elemento no existe
        console.log(`El ${tipo.toLowerCase()} no existe.`);
    }
}

// Asocia la función infofamilia al evento de clic en todo el body del documento
document.querySelector("body").addEventListener("click", infofamilia);
