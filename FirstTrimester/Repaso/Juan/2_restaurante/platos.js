let platos = [];
let carrito = [];

window.onload = () => {
    fetch('./platos.json').then(res => {
        if (!res) {
            throw new Error('va a ser que ahí no está el json, échale un ojo');
        }
        return res.json();
    }).then(data => {
        platos = [...data];
        document.querySelector('.bienvenida').textContent = 'Bienvenidos';
        setTimeout(() => {
            document.querySelector(".bienvenida").textContent = "";
        }, 3000);
        if (docCookies.getItem('ultima')) {
            document.querySelector('.cookie').textContent = docCookies.getItem('ultima');
        }
        docCookies.setItem('ultima', new Date(), Infinity);
    }).catch(e => {
        console.error('algo pasa con el fetch', e);
    });
}

document.querySelector('.filtrar').addEventListener('click', (e) => {
    e.preventDefault();
    const resultados = document.querySelector('.resultados');
    resultados.innerHTML = '';
    const min = document.querySelector('#min');
    const max = document.querySelector('#max');
    const minN = parseInt(min.value);
    let maxN = parseInt(max.value);
    const ingrediente = document.querySelector('.ingrediente').value;
    let filtrados = [...platos];
    if (maxN && maxN < minN) {
        max.value = minN;
        maxN = minN;
    }
    filtrados = filtroIngredientes(ingrediente, filtrados);
    filtrados = filtroPrecioMax(maxN, filtrados);
    filtrados = filtroPrecioMin(minN, filtrados);
    filtrados.forEach(p => pintaPlato(p, resultados));
});

const filtroIngredientes = (ingrediente, filtrados) => {
    return filtrados.filter(p => p.ingredientes.toLowerCase().includes(ingrediente.trim().toLowerCase()));
}

const filtroPrecioMin = (minN, filtrados) => {
    if (minN) {
        return filtrados.filter(p => p.precio >= minN);
    } else {
        return filtrados;
    }
}

const filtroPrecioMax = (maxN, filtrados) => {
    if (maxN) {
        return filtrados.filter(p => p.precio <= maxN);
    } else {
        return filtrados;
    }
}

const pintaPlato = (plato, resultados) => {
    const div = document.createElement('div');
    resultados.appendChild(div);
    div.innerHTML = `
     <div class="card" style="width: 18rem;">
            <img src="" class="card-img-top" alt="${plato.nombre}">
            <div class="card-body">
                <h5 class="card-title">${plato.nombre}</h5>
                <p class="card-text"><span class="text-success fw-bold">${plato.precio}</span> €</p>
                <p class="disponible">...</p>
                <a href="#" class="btn btn-primary detalles">Ver detalles</a>
                <button class="btn btn-success agregar">Agregar al carrito</button>
                <div class='listaDetalles'></div>
            </div>
        </div>
    `;
    const pDisponible = div.querySelector('.disponible');
    if (plato.disponible) {
        pDisponible.textContent = 'Disponible';
        pDisponible.classList.add('text-primary');
    } else {
        pDisponible.textContent = 'No Disponible';
        pDisponible.classList.add('text-danger');
    }
    const detalles = div.querySelector('.detalles');
    const listaDetalles = div.querySelector('.listaDetalles');
    detalles.addEventListener('click', () => {
        const ingredientes = plato.ingredientes.split(', ');
        listaDetalles.innerHTML = '';
        ingredientes.forEach(i => {
            const span = document.createElement('span');
            span.classList.add('badge', 'text-bg-primary');
            listaDetalles.appendChild(span);
            span.textContent = i;
        });
    });
    const agregar = div.querySelector('.agregar');
    agregar.addEventListener('click', () => {
        agregarAlCarrito(plato);
    });
}

const agregarAlCarrito = (plato) => {
    carrito.push(plato);
    mostrarCarrito();
};

const mostrarCarrito = () => {
    const carritoDiv = document.querySelector('.carrito');
    carritoDiv.innerHTML = '';
    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio;
        const div = document.createElement('div');
        div.innerHTML = `
            <span>${item.nombre} - ${item.precio} €</span>
            <button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button>
        `;
        div.querySelector('.eliminar').addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            carrito.splice(index, 1); //elimino uno a partir de esa posicion del index
            mostrarCarrito();
        });
        carritoDiv.appendChild(div);
    });
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<b>Total: ${total} €</b>`;
    carritoDiv.appendChild(totalDiv);
};

