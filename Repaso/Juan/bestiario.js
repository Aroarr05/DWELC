let bestiario = [];
let filtrados = []; // Variable global para almacenar los resultados filtrados

window.onload = () => {
    fetch('./bestiario.json').then(res => {
        if (!res) {
            throw new Error('va a ser que ahí no está el json, échale un ojo');
        }
        return res.json();
    }).then(data => {
        bestiario = [...data];
        console.log(bestiario);
        cargarDOM(bestiario);
    }).catch(e => {
        console.error('algo pasa con el fetch', e);
    });
};

const cargarDOM = (bestiario) => {
    const checkHabit = document.querySelector('.checkboxes');
    const desde = document.querySelector('#rangeMin');
    const hasta = document.querySelector('#rangeMax');
    const sliderTrack = document.querySelector('#rangeTrack');
    const minValue = document.querySelector('#minValue');
    const maxValue = document.querySelector('#maxValue');

    genCheckbox(bestiario, checkHabit);
    genRangos(bestiario, desde, hasta);

    desde.addEventListener('input', () => updateSlider(desde, hasta, sliderTrack, minValue, maxValue));
    hasta.addEventListener('input', () => updateSlider(desde, hasta, sliderTrack, minValue, maxValue));

    updateSlider(desde, hasta, sliderTrack, minValue, maxValue);
};

const genCheckbox = (bestiario, checkHabit) => {
    const habitats = new Set(bestiario.map(b => b.habitat));
    habitats.forEach(h => {
        const div = document.createElement('div');
        checkHabit.appendChild(div);
        div.classList.add('form-check');
        div.innerHTML = `
            <input class="form-check-input habitat" type="checkbox" value="${h}" id="${h}">
            <label class="form-check-label" for="${h}">${h}</label>
        `;
    });
};

const genRangos = (bestiario, desde, hasta) => {
    const min = bestiario.map(b => b.anioDescubrimiento).reduce((acc, anio) => Math.min(acc, anio), Infinity);
    const max = bestiario.map(b => b.anioDescubrimiento).reduce((acc, anio) => Math.max(acc, anio), -Infinity);

    desde.min = min;
    desde.max = max;
    desde.value = min;

    hasta.min = min;
    hasta.max = max;
    hasta.value = max;
};

const updateSlider = (desde, hasta, sliderTrack, minValue, maxValue) => {
    const min = parseInt(desde.value);
    const max = parseInt(hasta.value);

    if (min > max) {
        desde.value = max;
    } else if (max < min) {
        hasta.value = min;
    }

    minValue.textContent = desde.value;
    maxValue.textContent = hasta.value;

    const percentMin = ((min - desde.min) / (desde.max - desde.min)) * 100;
    const percentMax = ((max - hasta.min) / (hasta.max - hasta.min)) * 100;

    sliderTrack.style.background = `linear-gradient(to right, lightgray ${percentMin}%, #007bff ${percentMin}%, #007bff ${percentMax}%, lightgray ${percentMax}%)`;
};

const buscar = (e) => {
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value.trim().toLowerCase();
    const min = parseInt(document.querySelector('#rangeMin').value);
    const max = parseInt(document.querySelector('#rangeMax').value);
    const checados = [];
    document.querySelectorAll('.habitat').forEach(c => c.checked ? checados.push(c.value) : '');
    console.log(checados);

    if (checados.length > 0) {
        filtrados = bestiario.filter(b => checados.includes(b.habitat));
    } else {
        filtrados = [...bestiario];
    }

    if (nombre) {
        filtrados = filtrados.filter(b => b.nombre.toLowerCase().includes(nombre));
    }

    filtrados = filtrados.filter(b => b.anioDescubrimiento >= min && b.anioDescubrimiento <= max);

    pintaTabla(filtrados);
};

document.querySelector('.buscar').addEventListener('click', buscar);

const pintaTabla = (filtrados) => {
    const tabla = document.querySelector('#tabla');
    tabla.innerHTML = '';
    let num = 1;

    filtrados.forEach(f => {
        const tr = document.createElement('tr');
        tabla.appendChild(tr);
        if (f.peligrosidad == 'Alta') {
            tr.classList.add('table-danger');
        } else if (f.peligrosidad == 'Media') {
            tr.classList.add('table-warning');
        } else {
            tr.classList.add('table-success');
        }
        tr.innerHTML = `
        <td>${num++}</td>
        <td>${f.nombre}</td>
        <td>${f.habitat}</td>
        <td>${f.anioDescubrimiento}</td>
        <td><button class="btn btn-warning mDetalles">Auto-lectura</button></td>
        <td class="detalles"></td>
        `;

        const btnDetalles = tr.querySelector('.mDetalles');
        const tdDetalles = tr.querySelector('.detalles');

        btnDetalles.addEventListener('click', (e) => {
            e.preventDefault();
            const descripcion = f.descripcion.split(' ');
            let contador = 0;
            tdDetalles.textContent = '';

            const intervalo = setInterval(() => {
                if (contador < descripcion.length) {
                    tdDetalles.textContent += descripcion[contador++] + ' ';
                } else {
                    clearInterval(intervalo);
                }
            }, 500);
        });
    });
};

// Añadido, un ordenar de la tabla 
document.querySelector('#titulos').addEventListener('click', (e) => {
    const filtro = e.target.id;
    if (filtrados && filtro) {
        filtrados.sort((a, b) => (a[filtro] > b[filtro]));
        pintaTabla(filtrados);
    }
});
