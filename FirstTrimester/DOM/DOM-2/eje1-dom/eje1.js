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

function infofamilia(event) {
    const seleccion = event.target.closest('div, tr');
    seleccion ? manejarFamilia(seleccion) : console.log("El elemento selecionado no existe."); //realiza la misma funcion que un if/else
}
const manejarFamilia = (seleccion) => {
    seleccion.target === 'TR' ? showInfo("Fila seleccionada", seleccion) : showInfo("Elemento selecionado", seleccion);

    const padre = seleccion.parentElement;
    const abuelo = padre ? padre.parentElement : null;

    //Mostrar info del abuelo y el padre
    showInfo("Padre", padre);

    //Mostrar info de todos los hermanos
    mostrarHermanos(seleccion, padre);

    //Mostrar info del hermano anterior y posterior
    showInfo("Hermano anterior", seleccion.previousElementSibling);
    showInfo("Hermano posterior", seleccion.nextElementSibling);

    //Mostrar info del abulo
    showInfo("Abuelo", abuelo);

    //Mostrar info de los hermanos delm abuelo
    mostrarTios(abuelo.parentElement, abuelo)

    //Mostrar la info de los tios
    const tios = mostrarTios(abuelo, padre);

    //Mostrar la info de los primos
    mostrarPrimos(tios);

    //Mostrar la info de los hijos
    const hijos = mostrarHijos(seleccion);

    //Mostrar la info de los nietos
    mostrarNietos(hijos);
}

function mostrarHermanos(seleccion, padre) {
    console.log("Hermanos -->")
    if (padre && padre.children.length > 1) {
        Array.from(padre.children).forEach(hermano => {
            if (hermano != seleccion) {
                showInfo("Hermano", hermano);
            }
        })
    } else {
        console.log("No tiene hermanos.");
    }
}

function mostrarTios(abuelo, padre) {
    console.log("Tios -->");
    if (abuelo) {
        const tios = Array.from(abuelo.children).filter(tio => tio != padre);
        if (tios.length > 0) {
            tios.forEach(tio => showInfo("Tio", tio));
        } else {
            console.log("No tiene tios.");
        }
        return tios;
    } else {
        console.log("No tiene tios.");
        return [];
    }
}

function mostrarPrimos(tios) {
    console.log("Primos -->");
    let hayprimos = false;
    tios.forEach(tio => {
        const primos = Array.from(tio.children);
        if (primos.length > 0) {
            hayprimos = true;
            primos.forEach(primo => showInfo("Primo", primo))
        }
    });
    if (!hayprimos) {
        console.log("No tiene primos.");
    }
}

function mostrarHijos(seleccion) {
    console.log("Hijos --> ");
    const hijos = Array.from(seleccion.children);
    if (hijos.length > 0) {
        hijos.forEach(hijo => showInfo("Hijo", hijo));
    } else {
        console.log("No tiene hijos");
    }
    return hijos;
}

function mostrarNietos(hijos) {
    console.log("Nietos -->");
    let haynietos = false;
    hijos.forEach(hijo => {
        const nietos = Array.from(hijo.children);
        if (nietos.length > 0) {
            haynietos = true;
            nietos.forEach(nieto => showInfo("Nieto", nieto));
        }
    });
    if (!haynietos) {
        console.log("No tiene nietos.");
    }
}

function showInfo(tipo, miembro) {
    if (miembro) {
        console.log(`${tipo} --> Etiqueta: ${miembro.tagName}, ID: ${miembro.id || 'Sin ID'}`);
    } else {
        console.log(`El ${tipo.toLowerCase()} no existe.`);
    }
}

document.querySelector("body").addEventListener("click", infofamilia);