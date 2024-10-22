
// a.
let enlaces = document.getElementsByTagName('a');
let numeroEnlaces = enlaces.length;
console.log("Número de enlaces en la página: " + numeroEnlaces);

// b.
let penultimoEnlace = enlaces[numeroEnlaces - 2];
console.log("Dirección del penúltimo enlace: " + penultimoEnlace.href);

// c. 
let institutoEnlaces = 0;
for (let enlace of enlaces) {
    if (enlace.href.includes('instituto.com')) {
        institutoEnlaces++;
    }
}
console.log("Número de enlaces que enlazan al instituto: " + institutoEnlaces);

// d. 
let tercerParrafo = document.getElementsByTagName('p')[2];
let enlacesTercerParrafo = tercerParrafo.getElementsByTagName('a').length;
console.log("Número de enlaces en el tercer párrafo: " + enlacesTercerParrafo);

let resultados = document.getElementById('resultados');
resultados.innerHTML = `
    <p><strong>Número de enlaces en la página:</strong> ${numeroEnlaces}</p>
    <p><strong>Dirección del penúltimo enlace:</strong> ${penultimoEnlace.href}</p>
    <p><strong>Número de enlaces que enlazan al instituto:</strong> ${institutoEnlaces}</p>
    <p><strong>Número de enlaces en el tercer párrafo:</strong> ${enlacesTercerParrafo}</p>
`;
