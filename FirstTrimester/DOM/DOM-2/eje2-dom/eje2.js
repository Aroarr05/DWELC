//
/* 

    Make a function that goes through a list of links and, depending on the type of linked file
    (its extension), adds an image or icon next to the text of the link that represents it.

*/

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

