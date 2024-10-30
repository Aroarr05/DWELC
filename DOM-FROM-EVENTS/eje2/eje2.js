

//Name

function validateName(){
    const nameInput = document.getElementById("nombre").value.trim();
    const errorMessage = document.getElementById("error-message");

    if(nameInput.length >= 7 && nameInput.split (" ").length >=2){
        errorMessage.textContent="";
        alert("Name is valid!");
    } else {
        errorMessage.textContent="The name must contain at least a first and last name with a minimum of 7 characters.";
    }
    
}