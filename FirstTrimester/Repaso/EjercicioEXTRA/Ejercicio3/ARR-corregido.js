import { crearEmpresa, obtenerEmpresas, eliminarEmpresa } from './empresaController.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-alta-empresa');
    const tablaEmpresas = document.getElementById('tabla-empresas').querySelector('tbody');
    //BOTON DEL FORMULARIO
    const submitButton = form.querySelector('button[type="submit"]'); 

    //VARIABLE PARA GUARDAR LOS DATOS EDITADOS 
    let empresaEnEdicion = null; 

    // Función para renderizar la tabla
    const renderTablaEmpresas = () => {
        const empresas = obtenerEmpresas();

        tablaEmpresas.innerHTML = ''; 
        empresas.forEach(empresa => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${empresa.id}</td>
                <td>${empresa.nombre}</td>
                <td>${empresa.direccion}</td>
                <td>
                    <button class="editar" data-id="${empresa.id}">Editar</button>
                    <button class="eliminar" data-id="${empresa.id}">Eliminar</button>
                </td>
            `;
            tablaEmpresas.appendChild(fila); 
        });

        // ASIGNAR EVENTOS A LOS BOTONES DE EDITAR
        tablaEmpresas.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                //OBTENER LA ID DE LA EMPRESA
                const empresaId = e.target.dataset.id; 
                // BUSCAR LA EMPRESA 
                const empresa = obtenerEmpresas().find(emp => emp.id == empresaId);
                if (empresa) {
                    //RELLENAR EL FORMULARIO CON LOS DATOS CORRESPONDIENTES QUE TENGO 
                    form.nombre.value = empresa.nombre;
                    form.direccion.value = empresa.direccion;
                    empresaEnEdicion = empresa;
                    //CAMBIAR EL TEXTO DEL BOTON
                    submitButton.textContent = 'Actualizar Datos'; 
                }
            });
        });

        // ASIGNAR EVENTOS A LOS BOTONES PARA ELIMINAR 
        tablaEmpresas.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                //OBTENER LA ID DE LA EMPRESA 
                const empresaId = e.target.dataset.id; 
                if (confirm(`Eliminar empresa con ID: ${empresaId}?`)) {
                    eliminarEmpresa(empresaId); 
                    renderTablaEmpresas(); 
                }
            });
        });
    };

    // Manejo del formulario crear actualizar
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        //OBTENER LOS DATOS
        const nombre = form.nombre.value.trim(); 
        const direccion = form.direccion.value.trim(); 
        //VALIDA LOS CAMPOS SI ESTAN VACIOS
        if (!nombre || !direccion) { 
            alert('Completa los datos');
            return;
        }
        //SI HAY UNA EMPRESA EN EDICION QUE SE CAMBIEN LOS DATOS 
        if (empresaEnEdicion) {
            empresaEnEdicion.nombre = nombre;
            empresaEnEdicion.direccion = direccion;
            alert(`Empresa actualizada por ID: ${empresaEnEdicion.id}`);
            empresaEnEdicion = null; // Salir del modo edición
            //CAMBIAR EL TEXTO DEL BOTON
            submitButton.textContent = 'Crear'; 
        } else {
            // Si no hay empresa en edición, crear una nueva empresa
            crearEmpresa(nombre, direccion);
        }

        renderTablaEmpresas();

        // Limpiar el formulario 
        form.reset(); 
    });

    // Cargar la tabla inicialmente
    renderTablaEmpresas();
});
