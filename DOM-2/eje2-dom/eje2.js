// Mapeo de extensiones a íconos
const iconosPorExtension = {
    "pdf": "📄",
    "jpg": "🖼️",
    "jpeg": "🖼️",
    "png": "🖼️",
    "doc": "📝",
    "docx": "📝",
    "ppt": "📊",
    "pptx": "📊",
    "xls": "📑",
    "xlsx": "📑"
};

function agregarIconosEnlaces() {
    const enlaces = document.querySelectorAll("a");
    enlaces.forEach(enlace => {
        const url = enlace.getAttribute("href");
        const extension = url.split('.').pop().toLowerCase();

        if (iconosPorExtension[extension]) {
            const icono = document.createTextNode(" " + iconosPorExtension[extension]);
           
            enlace.appendChild(icono);
        }
    });
}

document.addEventListener("DOMContentLoaded", agregarIconosEnlaces);

