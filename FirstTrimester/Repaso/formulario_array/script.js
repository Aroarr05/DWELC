document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const searchInput = document.getElementById("search");
    const searchResults = document.getElementById("searchResults");
    const errorsDiv = document.getElementById("errors");
  
    let users = []; // Array para guardar los usuarios
  
    // Valida y maneja el envío del formulario
    userForm.addEventListener("submit", (e) => {
      e.preventDefault();
      errorsDiv.textContent = ""; // Limpia errores previos
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const age = document.getElementById("age").value.trim();
  
      // Validación básica
      const errors = [];
      if (!name) errors.push("El nombre es obligatorio.");
      if (!email || !email.includes("@")) errors.push("El correo no es válido.");
      if (!age || isNaN(age) || Number(age) <= 0) errors.push("La edad debe ser un número mayor a 0.");
  
      if (errors.length > 0) {
        errorsDiv.textContent = errors.join(" ");
        return;
      }
  
      // Agregar usuario al array
      users.push({ name, email, age: Number(age) });
  
      // Actualizar la lista de usuarios
      renderUserList();
      userForm.reset(); // Limpia el formulario
    });
  
    // Renderiza la lista de usuarios
    function renderUserList() {
      userList.innerHTML = users
        .map((user) => `<li>${user.name} - ${user.email} - ${user.age} años</li>`)
        .join("");
    }
  
    // Maneja la búsqueda
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(query)
      );
  
      searchResults.innerHTML = filteredUsers
        .map((user) => `<li>${user.name} - ${user.email} - ${user.age} años</li>`)
        .join("");
    });
  });
  