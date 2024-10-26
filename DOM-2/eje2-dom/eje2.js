function agregarIconoEnlaces() {
    const enlaces = document.querySelectorAll('a');

    enlaces.forEach(enlace => {
        const href = enlace.href;
        let icono;

        if (href.endsWith('.pdf')) {
            icono = '📄'; 
        } else if (href.endsWith('.jpg') || href.endsWith('.png')) {
            icono = '🖼️'; 
        } else if (href.endsWith('.zip')) {
            icono = '🗜️'; 
        } else {
            icono = '🔗'; 
        }

        enlace.innerHTML += ` ${icono}`;
    });
}

agregarIconoEnlaces();
