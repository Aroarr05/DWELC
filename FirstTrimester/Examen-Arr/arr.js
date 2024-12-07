document.addEventListener("DOMContentLoaded", () => {
    let selectedMovie = null;  // Variable para almacenar la película seleccionada

    // Llenar el selector de países
    const countrySelect = document.querySelector("#country-select");
    if (countries && Array.isArray(countries)) {
        countries.forEach(country => {
            const option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    } else {
        console.error('Countries list is not defined or is not an array.');
    }

    // Llenar los selectores de año (desde 2000 hasta el año actual)
    const fromSelect = document.querySelector("#from-select");
    const toSelect = document.querySelector("#to-select");
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= currentYear; year++) {
        const fromOption = document.createElement("option");
        fromOption.value = year;
        fromOption.textContent = year;
        fromSelect.appendChild(fromOption);

        const toOption = document.createElement("option");
        toOption.value = year;
        toOption.textContent = year;
        toSelect.appendChild(toOption);
    }

    // Manejador de cambio para el checkbox "allGenresCheckbox"
    const allGenresCheckbox = document.querySelector("#genders");
    const genreCheckboxes = [...document.querySelectorAll(".genre-checkbox")];

    // Si se selecciona "All genres", todos los checkboxes de géneros deben seleccionarse
    allGenresCheckbox.addEventListener("change", () => {
        genreCheckboxes.forEach(checkbox => checkbox.checked = allGenresCheckbox.checked);
    });

    // Verificar si todos los checkboxes de géneros están seleccionados o deseleccionados
    genreCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (genreCheckboxes.every(cb => !cb.checked)) {
                allGenresCheckbox.checked = false;  // Desmarcar "All genres" si ninguno está seleccionado
            } else if (genreCheckboxes.every(cb => cb.checked)) {
                allGenresCheckbox.checked = true;  // Marcar "All genres" si todos están seleccionados
            }
        });
    });

    // Evento de búsqueda
    document.querySelector("#search-button").addEventListener("click", () => {
        const selectedGenres = genreCheckboxes.filter(cb => cb.checked).map(cb => cb.id);
        searchMovies(selectedGenres);  // Llamada a la función que realiza la búsqueda
    });

    // Función que maneja el evento de "Detalles"
    function addDetailsButtonEvent() {
        const detailsButtons = document.querySelectorAll(".details-btn");
        detailsButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const movieID = e.target.getAttribute("data-id");

                // Buscar la película con el ID seleccionado
                selectedMovie = pelis.find(movie => movie.imdbID === movieID);
                
                if (selectedMovie) {
                    // Mostrar la información de la película en el modal
                    document.querySelector("#moviePoster").src = selectedMovie.Poster || 'default-poster.png';
                    document.querySelector("#movieTitle").textContent = selectedMovie.Title || "N/A";
                    document.querySelector("#movieYear").textContent = selectedMovie.Year || "N/A";
                    document.querySelector("#movieDirector").textContent = selectedMovie.Director || "N/A";
                    document.querySelector("#movieActors").textContent = selectedMovie.Actors || "N/A";
                    document.querySelector("#movieGenres").textContent = selectedMovie.Genre || "N/A";
                    document.querySelector("#moviePlot").textContent = selectedMovie.Plot || "No description available.";

                    // Mostrar el modal de Bootstrap
                    $("#movieModal").modal("show");
                } else {
                    console.error("Movie not found with ID:", movieID);  // Si no se encuentra la película
                }
            });
        });
    }

    // Función para realizar la búsqueda de películas
    function searchMovies(selectedGenres) {
        const name = document.querySelector("#name").value.toLowerCase();
        const titleChecked = document.querySelector("#title").checked;
        const directorChecked = document.querySelector("#director").checked;
        const actorsChecked = document.querySelector("#actors").checked;
        const fromYear = parseInt(document.querySelector("#from-select").value);
        const toYear = parseInt(document.querySelector("#to-select").value);

        // Filtrar las películas según los criterios seleccionados
        const filteredMovies = pelis.filter(movie => {
            const matchesName = (!name || 
                (titleChecked && movie.Title.toLowerCase().includes(name)) ||
                (directorChecked && movie.Director.toLowerCase().includes(name)) ||
                (actorsChecked && movie.Actors.toLowerCase().includes(name)));

            const matchesGenres = selectedGenres.length === 0 || 
            selectedGenres.every(genre => movie.Genre.toLowerCase().includes(genre.toLowerCase()));

            const movieYear = parseInt(movie.Year);
            const matchesYear = (isNaN(fromYear) || movieYear >= fromYear) &&
                                (isNaN(toYear) || movieYear <= toYear);
            
            return matchesName && matchesGenres && matchesYear;
        });

        displayMovies(filteredMovies);  // Llamada a la función para mostrar las películas filtradas
    }

    function displayMovies(movies) {
        const resultMessage = document.querySelector("#result-message");
        const moviesContainer = document.querySelector("#movies-container");
    
        moviesContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevas películas
        if (movies.length === 0) {
            resultMessage.textContent = 'No movies found.';  // Mensaje si no hay películas
        } else {
            resultMessage.textContent = `${movies.length} movie(s) found.`;  // Mensaje con el número de películas encontradas
            
            // Crear y agregar las tarjetas de las películas
            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('col-md-4', 'mb-4');
                movieCard.innerHTML = `
                    <div class="card">
                        <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
                            <div class="genres">
                                ${movie.Genre.split(',').map(genre => {
                                    return `<span class="badge" style="background-color: #9b59b6; color: white;">${genre.trim()}</span>`;
                                }).join(' ')}
                            </div>
                            <button class="btn btn-primary details-btn" data-id="${movie.imdbID}">Details</button>
                        </div>
                    </div>
                `;
    
                // Agregar el evento de detalles a la tarjeta
                const detailsButton = movieCard.querySelector(".details-btn");
                detailsButton.addEventListener("click", function () {
                    selectedMovie = pelis.find(movie => movie.imdbID === detailsButton.getAttribute("data-id"));
                    if (selectedMovie) {
                        const preDiv = document.createElement("div");
                        preDiv.innerHTML = `
                            <input type="submit" name="cerrar" class="cerrar" value="X">
                            <div>
                                <input type="text" name="ranking" id="ranking">
                                <input type="submit" name="cambio" id="cambio" value="Change">
                            </div>
                            <pre> ${JSON.stringify(selectedMovie, null, 2)}</pre>
                            <div id="update-history"></div>
                        `;
    
                        // Agregar o quitar el contenido adicional en el card
                        const cerrarButtom = preDiv.querySelector(".cerrar");
                        cerrarButtom.addEventListener("click", function () {
                            movieCard.removeChild(preDiv);
                        });
    
                        movieCard.appendChild(preDiv);
                    }
                });
    
                // Añadir la tarjeta al contenedor
                moviesContainer.appendChild(movieCard);
            });
        }
    }
});
