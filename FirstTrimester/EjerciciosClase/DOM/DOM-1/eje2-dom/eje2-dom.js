
// a.
const enlaces = document.getElementsByTagName('a');
console.log( enlaces.length);

// b.
let penultimoEnlace = enlaces[numeroEnlaces - 2];
console.log(penultimoEnlace.href);
console.log(penultimoEnlace.getAttribute("href"));

// c. 
let institutoEnlaces = Array.from(enlaces).filter(enlaces => enlaces.getAttribute("href") == "https://iesbelen.org");
console.log(institutoEnlaces.length);
//console.log(document.querySelectorAll("a[herf=https://iesbelen.org]"));

// d. 
const tercerParrafo = document.getElementsByTagName('p')[2];
let enlacesTercerParrafo = tercerParrafo.getElementsByTagName('a').length;
console.log(enlacesTercerParrafo);

