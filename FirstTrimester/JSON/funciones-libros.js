
//Funcion para mostrar los libros en la tabla
function mostrarlibros() {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = '';  // Limpiamos la tabla antes de agregar filas nuevas.
  
    libros.forEach(l => {
        const fila = document.createElement('tr');  // Cada fila es un elemento 'tr'.
  
        fila.innerHTML = `
            <td>${l.Titulo}</td>
            <td>${l.Genero.join(', ')}</td>
            <td>${l.Autor.join(', ')}</td>
            <td>${l.Paginas}</td>
            <td>${l.Publicado}</td>
            <td>${l.Leido ? 'Sí' : 'No'}</td>
            <td>${l.SitioWeb ? `<a href="${l.SitioWeb}" target="_blank">Ver</a>` : 'N/A'}</td>
        `;
  
        tabla.appendChild(fila);  // Añadimos la fila a la tabla.
    });
}
  
mostrarlibros();

const outputDiv = document.getElementById('output');

// 1. Name of each of the genres
function showGenres() {
    const genres = [...new Set(libros.map(libro => libro.Genero).flat())]; // Obtener géneros únicos
    outputDiv.innerHTML = `<h3>Géneros:</h3><p>${genres.join(', ')}</p>`;
}

// 2. Title of books with more than 300 pages
function showBooksOver300Pages() {
    const booksOver300 = libros.filter(libro => libro.Paginas > 300)
                               .map(libro => `<div>${libro.Titulo}</div>`).join('');
    outputDiv.innerHTML = `<h3>Libros con más de 300 páginas:</h3>${booksOver300}`;
}
// 3. Title of books published more than 2 years ago
function showBooksPublishedMoreThan2Years() {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    const oldBooks = libros.filter(libro => new Date(libro.Publicado) < twoYearsAgo)
                           .map(libro => `<div>${libro.Titulo} (Publicado: ${libro.Publicado})</div>`)
                           .join('');
    outputDiv.innerHTML = `<h3>Libros publicados hace más de 2 años:</h3>${oldBooks}`;
}

// 4. Name of the authors and number of books they have written
function showAuthorsAndBooksCount() {
    const authorCount = {};
    libros.forEach(libro => {
        libro.Autor.forEach(autor => {
            authorCount[autor] = (authorCount[autor] || 0) + 1;
        });
    });

    const authorList = Object.entries(authorCount)
                            .map(([autor, count]) => `<div>${autor}: ${count} libro(s)</div>`)
                            .join('');
    outputDiv.innerHTML = `<h3>Autores y número de libros:</h3>${authorList}`;
}

// 5. Title of the books read, ordered by publishing date
function showReadBooksOrdered() {
    const readBooks = libros.filter(libro => libro.Leido)
                            .sort((a, b) => new Date(a.Publicado) - new Date(b.Publicado))
                            .map(libro => `<div>${libro.Titulo} (Publicado: ${libro.Publicado})</div>`)
                            .join('');
    outputDiv.innerHTML = `<h3>Libros leídos ordenados por fecha de publicación:</h3>${readBooks}`;
}
// Asociar botones a las funciones
document.getElementById('question1').addEventListener('click', showGenres);
document.getElementById('question2').addEventListener('click', showBooksOver300Pages);
document.getElementById('question3').addEventListener('click', showBooksPublishedMoreThan2Years);
document.getElementById('question4').addEventListener('click', showAuthorsAndBooksCount);
document.getElementById('question5').addEventListener('click', showReadBooksOrdered);
