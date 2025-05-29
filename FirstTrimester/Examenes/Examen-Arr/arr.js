//Autor: Aroa Rivas Rios

document.addEventListener("DOMContentLoaded", () => {
    setupGenders();
    setupCountrySelector();
    setupYearSelectors();
    setupSearchButton();
});

function setupGenders() {
    const gendersContainer = document.querySelector("#genders-container");
    
    genders.forEach(gender => {
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("form-check");
        
        const checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.classList.add("form-check-input", "genre-checkbox");
        checkboxInput.id = gender.toLowerCase();
        
        const checkboxText = document.createElement("label");
        checkboxText.classList.add("form-check-label");
        checkboxText.setAttribute("for", checkboxInput.id);
        checkboxText.textContent = gender;

        checkboxLabel.appendChild(checkboxInput);
        checkboxLabel.appendChild(checkboxText);
        gendersContainer.appendChild(checkboxLabel);
    });

    const allGenresCheckbox = document.querySelector("#genders");
    const genreCheckboxes = [...document.querySelectorAll(".genre-checkbox")];
    
    allGenresCheckbox.addEventListener("change", () => {
        genreCheckboxes.forEach(checkbox => checkbox.checked = allGenresCheckbox.checked);
    });
    
    genreCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                if (genreCheckboxes.every(cb => cb.checked)) {
                    allGenresCheckbox.checked = true;
                }
            } else {
                allGenresCheckbox.checked = false;
            }
        });
    });
}

function setupCountrySelector() {
    const countrySelect = document.querySelector("#country-select");

    if (countries && Array.isArray(countries)) {
        countries.forEach(country => {
            const option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    }
}

function setupYearSelectors() {
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
}

function setupSearchButton() {
    document.querySelector("#search-button").addEventListener("click", () => {
        const genreCheckboxes = [...document.querySelectorAll(".genre-checkbox")];
        const selectedGenres = genreCheckboxes.filter(cb => cb.checked).map(cb => cb.id);
        searchMovies(selectedGenres);
    });
}

function searchMovies(selectedGenres) {
    const name = document.querySelector("#name").value.toLowerCase();
    const titleChecked = document.querySelector("#title").checked;
    const directorChecked = document.querySelector("#director").checked;
    const actorsChecked = document.querySelector("#actors").checked;
    const fromYear = parseInt(document.querySelector("#from-select").value);
    const toYear = parseInt(document.querySelector("#to-select").value);
    
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
        
        displayMovies(filteredMovies);
    }
    
    function displayMovies(movies) {
        const resultMessage = document.querySelector("#result-message");
        const moviesContainer = document.querySelector("#movies-container");
        
        moviesContainer.innerHTML = '';
        if (movies.length === 0) {
            resultMessage.textContent = 'No movies found.';
        } else {
        resultMessage.textContent = `${movies.length} movie(s) found.`;
        
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            
            movieCard.classList.add('col-md-4', 'mb-4');
            movieCard.innerHTML = `
            <div class="card">
            <img src="${movie.Images && movie.Images.length > 0 ? movie.Images[0] : movie.Poster}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body styled-body">
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
            
            setupMovieCardDetails(movieCard, movie);
            
            moviesContainer.appendChild(movieCard);
        });
    }
}

function setupMovieCardDetails(movieCard, movie) {
    let selectedMovie = null;
    const detailsButton = movieCard.querySelector(".details-btn");
    detailsButton.addEventListener("click", function () {
        selectedMovie = pelis.find(m => m.imdbID === detailsButton.getAttribute("data-id"));
        
        if (selectedMovie) {
            const preDiv = document.createElement("div");
            preDiv.innerHTML = `
            <br>
            <input type="submit" name="cerrar" class="cerrar" value="X">
            <div>
            <br>
            <input type="text" name="ranking" id="ranking" placeholder="New IMDb Rating" value="${selectedMovie.imdbRating}">
            <input type="submit" name="cambio" id="cambio" value="Change" ${isNaN(selectedMovie.imdbRating) ? 'disabled' : ''}>
            </div>
            <br>
            <pre>${JSON.stringify(selectedMovie, null, 2)}</pre>
            <div id="update-history"></div>
            `;
            
            const cerrarButton = preDiv.querySelector(".cerrar");
            cerrarButton.addEventListener("click", function () {
                movieCard.removeChild(preDiv);
                movieCard.classList.remove('selected-card');
            });
            
            const changeButton = preDiv.querySelector("#cambio");
            const rankingInput = preDiv.querySelector("#ranking");
            const historyContainer = preDiv.querySelector("#update-history");
            
            rankingInput.addEventListener('input', function () {
                const newRating = parseFloat(rankingInput.value);
                changeButton.disabled = isNaN(newRating) || newRating < 0 || newRating > 10;
            });
            
            changeButton.addEventListener("click", function () {
                const newRating = parseFloat(rankingInput.value);
                
                if (!isNaN(newRating) && newRating >= 0 && newRating <= 10) {
                    const currentDateTime = new Date();
                    const formattedDate = currentDateTime.toLocaleDateString();
                    const formattedTime = currentDateTime.toLocaleTimeString();
                    selectedMovie.imdbRating = newRating;
                    
                    const updateEntry = document.createElement("p");
                    updateEntry.textContent = `Rating changed to ${newRating} on ${formattedDate} at ${formattedTime}`;
                    historyContainer.appendChild(updateEntry);
                    
                    const preElement = preDiv.querySelector("pre");
                    preElement.textContent = JSON.stringify(selectedMovie, null, 2);
                }
            });
            
            movieCard.appendChild(preDiv);
        }

        movieCard.classList.add('selected-card');
    });
}
