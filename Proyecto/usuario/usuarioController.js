document.addEventListener('DOMContentLoaded', function() {
   
    const backButton = document.querySelector('.back-btn-container .btn');
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.history.back();
        });
    }

    
    const primaryButton = document.querySelector('.btn .btn-primary');
    if (primaryButton) {
        primaryButton.addEventListener('click', function () {
            desplegar(); 
        });
    }

    const espacioDiv = document.querySelector('.espacio');
    if (espacioDiv) {
        
        let tabla = document.createElement('table');
        tabla.classList.add('table', 'table-bordered', 'table-striped','p-3');
        
        
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <th>Nombre</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Confirmar Contraseña</th>
            <th>Términos Aceptados</th>
        `;
        thead.appendChild(tr);
        tabla.appendChild(thead);
        
        let tbody = document.createElement('tbody');
        usuarios.forEach(usuario => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.password}</td>
                <td>${usuario.confirmPassword}</td>
                <td>${usuario.terms ? 'Sí' : 'No'}</td>
            `;
            tbody.appendChild(tr);
        });
        tabla.appendChild(tbody);
        
        espacioDiv.appendChild(tabla);
    } else {
        console.error('No se encontró el div con clase .espacio');
    }
});
