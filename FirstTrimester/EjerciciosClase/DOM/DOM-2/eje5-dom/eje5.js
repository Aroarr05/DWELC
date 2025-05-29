//
/*

    Create an image viewer, to do this, an image will be displayed on your page, along with
    two buttons "Next" and "Previous".

*/

const imagenes = [
    "imagenes/mariposa.jpg",
    "imagenes/mono.jpg",
    "imagenes/serpiente.jpg",
    "imagenes/husky.jpg"
];

let indiceActual = 0;

const imgElement = document.querySelector("#image");
const nextButton = document.querySelector("#next");
const previousButton = document.querySelector("#previous");

function mostrarImagen() {
    imgElement.src = imagenes[indiceActual];
}

nextButton.addEventListener("click", () => {
    indiceActual = (indiceActual + 1) % imagenes.length; 
    mostrarImagen();
});

previousButton.addEventListener("click", () => {
    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
    mostrarImagen();
});

mostrarImagen();
