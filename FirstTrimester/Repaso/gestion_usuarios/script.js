document.addEventListener("DOMContentLoaded", () => {
    const userTable = document.querySelector("#userTable").querySelector("tbody");
    const form = document.querySelector("#userForm");
    const nameInput = document.querySelector("#name");
    const ageInput = document.querySelector("#age");
    const emailInput = document.querySelector("#email");
    const errorElement = document.querySelector("#error");
    const searchInput = document.querySelector("#search");
    const searchResults = document.querySelector("#searchResults");
    const addUserButton = document.querySelector("#addUser");
    const updateUserButton = document.querySelector("#updateUser");
    let editingIndex = null;

    // Función para mostrar los usuarios
    function displayUsers() {
        userTable.innerHTML = ""; // Limpiar la tabla
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="editable" data-index="${index}">${user.name}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td><button data-index="${index}" class="deleteUser">Eliminar</button></td>
            `;
            userTable.appendChild(row);
        });

        // Asignar eventos a los botones de eliminar
        document.querySelectorAll(".deleteUser").forEach(button => {
            button.addEventListener("click", () => {
                const index = parseInt(button.dataset.index);
                users.splice(index, 1); // Eliminar del array
                displayUsers(); // Actualizar tabla
            });
        });

        // Asignar eventos a los nombres de usuario para la edición
        document.querySelectorAll(".editable").forEach(cell => {
            cell.addEventListener("click", () => {
                const index = parseInt(cell.dataset.index);
                const user = users[index];
                // Cargar los datos en el formulario
                nameInput.value = user.name;
                ageInput.value = user.age;
                emailInput.value = user.email;
                editingIndex = index;

                // Mostrar el botón de actualizar y ocultar el de agregar
                addUserButton.style.display = "none";
                updateUserButton.style.display = "inline-block";
            });
        });
    }

    // Mostrar los datos iniciales
    displayUsers();

    // Validar y agregar usuario
    addUserButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value.trim());
        const email = emailInput.value.trim();

        // Validación
        if (!name || !email || isNaN(age) || age <= 0) {
            errorElement.textContent = "Por favor, completa todos los campos correctamente.";
            return;
        }

        // Limpiar error y añadir usuario al array
        errorElement.textContent = "";
        const newUser = { name, age, email };
        users.push(newUser);

        // Actualizar la tabla del DOM
        displayUsers();

        // Limpiar formulario
        form.reset();
    });

    // Actualizar un usuario existente
    updateUserButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value.trim());
        const email = emailInput.value.trim();

        // Validación
        if (!name || !email || isNaN(age) || age <= 0) {
            errorElement.textContent = "Por favor, completa todos los campos correctamente.";
            return;
        }

        // Limpiar error y actualizar el usuario en el array
        errorElement.textContent = "";
        users[editingIndex] = { name, age, email };

        // Actualizar la tabla del DOM
        displayUsers();

        // Limpiar formulario
        form.reset();

        // Resetear el índice de edición
        editingIndex = null;
    });

    // Búsqueda de usuarios
    document.querySelector("#searchUser").addEventListener("click", () => {
        const query = searchInput.value.trim().toLowerCase();
        const results = users.filter(user => user.name.toLowerCase().includes(query)); //Busqueda una letra
        //const results = users.filter(user => user.name.toLowerCase() === query); // Búsqueda exacta

        // Mostrar resultados de búsqueda
        searchResults.innerHTML = `
            <h3>Resultados de Búsqueda:</h3>
            <ul>
                ${results.map(user => `<li>${user.name} - ${user.age} años - ${user.email}</li>`).join("")}
            </ul>
        `;
    });
});
    

    

    
