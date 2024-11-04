
const iconos = {
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

function agregarIconos() {
    const enlaces = document.querySelectorAll("a");
    enlaces.forEach(enlace => {
        const url = enlace.getAttribute("href");
        const extension = url.split('.').pop().toLowerCase();

        if (iconos[extension]) {
            const icono = document.createTextNode(" " + iconos[extension]);
            enlace.appendChild(icono);
        }
    });
}

document.addEventListener("DOMContentLoaded", agregarIconos);

