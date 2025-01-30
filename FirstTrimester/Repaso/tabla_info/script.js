document.addEventListener('DOMContentLoaded', function() {
    const people = [
        { name: "Jon", surname: "Doe", age: 12, alive: true, editCount: 0 },
        { name: "Jane", surname: "Done", age: 3, alive: true, editCount: 0 },
        { name: "Foo", surname: "Bar", age: 33, alive: false, editCount: 0 }
    ];
    
    const table = document.querySelector("tbody");
    const form = document.querySelector("#personForm"); // Corrected form ID to "#personForm"
    const nameInput = document.querySelector("#nameInput");
    const surnameInput = document.querySelector("#surnameInput");
    const ageInput = document.querySelector("#ageInput");
    const aliveInput = document.querySelector("#aliveInput");
    let selectedRowIndex = null;

    // Render the table with the people data
    function renderTable() {
        table.innerHTML = ''; // Clear the table contents

        people.forEach((person, index) => {
            const row = table.insertRow();

            row.dataset.index = index;

            // Corrected way to insert cell content
            row.insertCell().textContent = person.name;
            row.insertCell().textContent = person.surname;
            row.insertCell().textContent = person.age;
            row.insertCell().textContent = person.alive ? 'Yes' : 'No';

            // Create a delete button in the last cell
            const deleteCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'DELETE';
            deleteButton.classList.add('delete-btn');
            deleteCell.appendChild(deleteButton);
        });
    }
    
    // Call renderTable initially to populate the table
    renderTable();

    table.addEventListener('click', function(event) {
        const target = event.target;
    
        // Handle delete button click
        if (target.classList.contains('delete-btn')) {
            const row = target.closest('tr');
            const index = row.dataset.index;
            people.splice(index, 1);
            renderTable();
            return;
        }
    
        // Remove 'selected-row' class from any previously selected rows
        table.querySelectorAll('tr').forEach(row => row.classList.remove('selected-row'));
    
        // Handle row click for editing
        const row = target.closest('tr');
        if (row) {
            selectedRowIndex = row.dataset.index;
            row.classList.add('selected-row');  // Add 'selected-row' class to highlight it
            const person = people[selectedRowIndex];
    
            if (person.editCount >= 3) {
                const confirmEdit = confirm("This row has been edited more than 3 times. Are you sure you want to edit it?");
                if (!confirmEdit) return;
            }
    
            nameInput.value = person.name;
            surnameInput.value = person.surname;
            ageInput.value = person.age;
            aliveInput.checked = person.alive;
        }
    });
       

    // Event listener for the update button
    document.querySelector("#updateBtn").addEventListener("click", function () {
        // Check if there's a duplicate entry in the people array
        const duplicate = people.some((person, index) => {
            return index != selectedRowIndex &&
                   person.name === nameInput.value &&
                   person.surname === surnameInput.value &&
                   person.age === parseInt(ageInput.value);
        });

        if (duplicate) {
            alert("This person is already in the table.");
            return; // Exit if duplicate is found
        }

        if (selectedRowIndex !== null) {
            // Update the selected person in the array
            const person = people[selectedRowIndex];
            person.name = nameInput.value;
            person.surname = surnameInput.value;
            person.age = parseInt(ageInput.value);
            person.alive = aliveInput.checked;
            person.editCount += 1;

            // Reset selected row index
            selectedRowIndex = null;
        } else {
            // Add a new person to the array if no row is selected
            people.push({
                name: nameInput.value,
                surname: surnameInput.value,
                age: parseInt(ageInput.value),
                alive: aliveInput.checked,
                editCount: 0
            });
        }

        // Clear the form
        form.reset();

        // Re-render the table
        renderTable();
    });
});
