
const imagenes = [
    "imagenes/image1.jpg",
    "imagenes/image2.jpg",
    "imagenes/image3.jpg",
    "imagenes/image4.jpg"
];

let indiceActual = 0;


const imgElement = document.getElementById("image");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

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
