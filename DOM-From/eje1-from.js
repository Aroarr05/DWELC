
const formulario = document.getElementById('formulario');
const submitButton = document.getElementById('submitButton');
const resultadoDiv = document.getElementById('resultado');


function validarFormulario(event) {
    event.preventDefault(); 

    const elementos = formulario.elements;
    let formularioValido = true;
    let datosUsuario = '';

    for (let i = 0; i < elementos.length; i++) {
        const elemento = elementos[i];

        if (elemento.type !== 'submit' && elemento.type !== 'button') {
            if (!elemento.value) {
                elemento.classList.add('is-invalid'); 
                formularioValido = false;
            } else {
                elemento.classList.remove('is-invalid');
                if (elemento.name) {
                    datosUsuario += `<strong>${elemento.name}:</strong> ${elemento.value} <br>`;
                }
            }
        }
    }

    const genero = document.querySelector('input[name="genero"]:checked');
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');

    if (!genero) {
        formularioValido = false;
        alert("Debe seleccionar un género");
    } else {
        datosUsuario += `<strong>genero:</strong> ${genero.value} <br>`;
    }

    if (intereses.length === 0) {
        formularioValido = false;
        alert("Debe seleccionar al menos un interés");
    } else {
        datosUsuario += '<strong>intereses:</strong> ';
        intereses.forEach((interes, index) => {
            datosUsuario += interes.value + (index < intereses.length - 1 ? ', ' : '');
        });
        datosUsuario += '<br>';
    }

    if (formularioValido) {
        resultadoDiv.innerHTML = `<h3>Datos Ingresados:</h3> ${datosUsuario}`;
    }
}

submitButton.addEventListener('click', validarFormulario);
