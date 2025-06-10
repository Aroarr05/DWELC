let centros = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarYmostrarDatos("./../assets/json/CentrosComerciales.json");

    manejarFiltros();
    //editarDatos();
});

function cargarYmostrarDatos(url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar los Centros");
            }
            return response.json();
        })
        .then((data) => {
            CentrosComerciales = data;
            console.log("Centros comerciales:", CentrosComerciales);
            mostrarDatos();
        })
        .catch((error) => {
            console.error("Error al cargar datos:", error);
        });
}

function mostrarDatos() {
    const tablaBody = document.querySelector('#tablaDatos tbody');
    const resultadoCantidad = document.querySelector("#resultadosCantidad");
    const resultadoCentos = document.querySelector('#resultadoCentos');

    tablaBody.innerHTML = '';
    resultadoCantidad.textContent = `${CentrosComerciales.length} Centro(s) encontrados`;
    //resultadoCentos.textContent =`${CentrosComerciales.}`

    CentrosComerciales.forEach(centro => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${centros.Código}</td>
        <td>${centro.Nombre}</td>
        `;
        tablaBody.appendChild(fila);
    });
}

function manejarFiltros() {
    document.querySelector("#buscar").addEventListener("click", () => {
        const centrosFiltrados = filtrarCentros();
        mostrarDatos(centrosFiltrados);
        console.log(centrosFiltrados);
    });
}

function filtrarCentros() {
    const filtrarDatos = document.querySelector("#filtrarDatos").value;

    return CentrosComerciales.filter(centro => {
        const datos = filtrarDatos === "all" ||
            (filtrarDatos === "Telefono" && centro.Teléfono) ||
            (filtrarDatos === "Email" && centro.Email) ||
            (filtrarDatos === "URL" && centro.URLReal);

        return datos;
    });
}

function cargarFormulario(datos){
    const codigoInput = document.querySelector("#codigo");
    codigoInput.readOnly= true;

    const nombreInput = document.querySelector("#nombre");
    nombreInput.readOnly= true;
}

/*function editarDatos(){
    const editar = document.querySelector('#datos');
    editar.innerHTML='';

    CentrosComerciales.forEach(editarCentros=>{
        const divCentros = document.createElement("div");
        divCentros.innerHTML=`
        <div class="codigo">
            <label>Código</label>
            <input type="text" id="codigo">
        </div>
        <div class="nombre">
            <label>Nombre</label>
            <input type="text" id="nombre">
        </div>
        <div class="telefono">
            <label>Teléfono</label>
            <input type="text" id="telefono">
        </div>
        <div class="email">
            <label>Email</label>
            <input type="text" id="email">
        </div>
        <div class="urlReal">
            <label>URL Real</label>
            <input type="text" id="urlReal">
        </div>
        <div id="tipoCentro">
            <label>¿Es centro urbano?</label>
            <input type="checkbox">
        </div>
        <button>Guardar</button>
        <label></label>
        <br>
        <button>Anterior</button>
        <button>Siguiente</button>
        `;
        editar.appendChild(divCentros);
    });

}*/

function editarDatos (fila){
    document.querySelectorAll('.fila-seleccionada').forEach(f => {
        f.classList.remove('fila-seleccionada');
    });

    fila.classList.add("fila-seleccionada");
   const index = fila.dataset.index;
    centroSeleccionado = animals[index];

    mostrarDatos();

    document.querySelector("#codigo").value = centroSeleccionado.Código;
    document.querySelector("#nombre").value = centroSeleccionado.Nombre;
    document.querySelector("#telefono").value = centroSeleccionado.Teléfono;

    document.querySelector("#email").value = centroSeleccionado.Email;
    document.querySelector("#urlReal").value = centroSeleccionado.URLReal;

    document.querySelector("#tipoCentro").checked = centroSeleccionado.tipoCentro;

    
    const checkboxes = document.querySelectorAll('#revision input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = animalSeleccionado.revison?.includes(cb.nextElementSibling.textContent.trim()) || false;
    });

    document.querySelector("#diagnostico").value = animalSeleccionado.diagnostico || "";
}

function validarFormulario(){
    const email = document.querySelector("#email").value;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        alert("Ingrese un correo válido.");
        return false;
    }
    const url=document.querySelector("#urlReal").value;
    if(!/^https?:\/\/.+$/.test(url)){
        alert('Ingrese una URL válida.');
        return false;
    }

    const telefono = document.querySelector("#telefono").value;
    if(!/^\d{9}$/.test(telefono)){
        alert('El teléfono debe tener 9 dígitos.');
        return false;
    }
    return true;
}