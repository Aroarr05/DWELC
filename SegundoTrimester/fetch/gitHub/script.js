document.querySelector('#boton').addEventListener('click', ()=>{
    const input = document.querySelector('#nombre');
    const nombre = input.ariaValueMax;
    const url = `https://api.github.com/users/${nombre}`;

    fetch(url)
    .then((response)=>response.json())
    .then((data) => {
        console.log(data);
        //const fechaCreacion = data.;
        //const numeroSegidores = data.;
        //const listaDeNombres = data.;
        //const fechaDeSegidores = data.;

    })

});