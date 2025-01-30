supers = [];
const resultado = document.querySelector('.resultados');

window.onload = () => {

    fetch('./supers.json').then(res => {
        if (!res) {
            throw new Error('va a ser que ahí no está el json, échale un ojo');
        }
        return res.json();
    }).then(data => {
        console.log('recibido', data);
        supers = [...data];
        console.log(supers);
        
        constructorDOM(supers);       
    }).catch(e => {
        console.error('algo pasa con el fetch', e);

    });
}


const constructorDOM = (supers) => {
    const equipos = new Set (supers.map(s => s.equipo));
    const iniA = supers.reduce((min, s)=> Math.min(min, s.anioAparicion), Infinity);
    const ultA = supers.reduce((max, s)=> Math.max(max, s.anioAparicion), -Infinity);
    const from = document.querySelector('#desde');
    const to = document.querySelector('#hasta');
    genEquipos(equipos);
    genAnio(iniA, ultA, from);
    genAnio(iniA, ultA, to);   
pintaCookies();

    from.addEventListener('change', (e)=> {
    genAnio(e.target.value, ultA, to)
    });
}
const pintaCookies = () => {
    const cookiesDiv = document.querySelector('.cookies');
    cookiesDiv.innerHTML = '';

    docCookies.keys().forEach(key => {
        if (docCookies.getItem(key)){
            const p = document.createElement('p');
            p.textContent = `${key}: ${docCookies.getItem(key)}`;
            cookiesDiv.appendChild(p);
        }
    });
};

const genEquipos = (equipos)=> {
    const introEquipos = document.querySelector('.introEquipos');
    introEquipos.innerHTML='';
    for (e of equipos) {
        const div = document.createElement('div');
        introEquipos.appendChild(div);
        div.classList.add('d-flex', 'equipo');
        div.innerHTML = `
        <input type="radio" name="equipo" id="${e}" class="equipos" value="${e}">
        <label class="mx-2" for="${e}">${e}</label>
    `;
    }
}
const genAnio= (desde, hasta, select)=> {
    select.innerHTML='';
    const option = document.createElement('option');
    option.value = '';
    option.textContent= '---';
    select.appendChild(option);
    for (let i = desde; i<=hasta; i++) {              
        const option = document.createElement('option');
        option.value = i;
        option.textContent= i;
        select.appendChild(option);
    }
}
// --------------------
const pintaTarjeta = (sup) => {
    const personaje = document.createElement('div');
    resultado.appendChild(personaje);
    personaje.classList.add('card');
    personaje.style.width = '18rem';
    personaje.innerHTML = `
            <img src="${sup.img[0]}" class="card-img-top fotico" data-id=${sup.nombre} alt="...">
            <div class="card-body">
            <h3 class="card-title">${sup.nombre}</h3>
            <div class="detalles">
                </div>
            </div>
    `;

    personaje.addEventListener('click', (e) => {
        const pj = e.currentTarget;

        document.querySelectorAll('.abierta').forEach(p => {
            if (p !== pj) { 
                p.querySelector('.detalles').innerHTML = "";
                p.classList.remove('abierta');
            }
        });

       
        if (pj.classList.contains('abierta')) {
            pj.querySelector('.detalles').innerHTML = "";
            pj.classList.remove('abierta');
        } else {
            pj.classList.add('abierta');
            pintaDetalles(sup, pj);
        }
    });
};

const pintaDetalles = (sup, pj) => {
    const detalles = pj.querySelector('.detalles'); 
    detalles.innerHTML = `
        <h4 class="team"> ${sup.equipo}</h4>
        <h5 class="anio">${sup.anioAparicion}</h5>
        <p class="card-text">${sup.poder}</p>
    `;
};
// ---------------------------------
document.querySelector('.busca').addEventListener('click', (e) => {
    e.preventDefault();
    const resultado = document.querySelector('.resultados');
    resultado.innerHTML = '';

    const nombre = document.querySelector('#nombre').value;
    const poder = document.querySelector('#poder').value;
    const equipo = document.querySelector('input[name="equipo"]:checked')?.value || '';
    const ai = parseInt(document.querySelector('#desde').value) || 0;
    const ao = parseInt(document.querySelector('#hasta').value) || Number.MAX_SAFE_INTEGER;

    docCookies.setItem('nombre', nombre,60);
    docCookies.setItem('poder', poder,60);
    docCookies.setItem('equipo', equipo,60);

    // Copia inicial de todos los superhéroes
    let marcados = [...supers];

    // Aplica los filtros uno por uno
    if (nombre) marcados = filtroTexto(nombre, 'nombre', marcados);
    if (poder) marcados = filtroTexto(poder, 'poder', marcados);
    marcados = filtroAnio(ai, ao, marcados);
    if (equipo) marcados = filtroEquipo(equipo, marcados);

    // Genera las tarjetas para los elementos filtrados
    for (const s of marcados) {
        pintaTarjeta(s);
    }
    pintaCookies();
    cambiaFoto();
});

const filtroTexto = (entrada, campo, marcados) => {
    return marcados.filter(s => s[campo]?.toLowerCase().includes(entrada.toLowerCase()));
};

const filtroAnio = (ai, ao, marcados) => {
    return marcados.filter(s => s.anioAparicion >= ai && s.anioAparicion <= ao);
};

const filtroEquipo = (equipo, marcados) => {
    return marcados.filter(s => s.equipo === equipo);
};

document.querySelector('.crear').addEventListener('click', (e)=> {
    e.preventDefault();
    const nombre = document.querySelector('#nombreC').value;
    const poder = document.querySelector('#poderC').value;
    const equipo = document.querySelector('#equipoC').value;
    const anio = document.querySelector('#anioC').value;
    const imgDef = ["./assets/img/i1.jpg", "./assets/img/i2.jpg", "./assets/img/i3.jpg", "./assets/img/i4.jpg" ];

    const nuevo = {
        "nombre": nombre,
        "poder": poder,
        "equipo": equipo,
        "anioAparicion": anio,
        "img":imgDef,
      };
      supers.push(nuevo);
      constructorDOM(supers);
});
const cambiaFoto = ()=> {
    const fotos = document.querySelectorAll('.fotico');
    contador = 0;
    fotos.forEach(f => {
        console.log(f.id);
        
        const superheroe =supers.find(s => s.nombre==f.dataset.id);
        setInterval(()=>{
            f.src=superheroe.img[contador];
            contador++;
            if (contador==4){
                contador=0;
            }
        }, 1000)
        
    });    
    

}







