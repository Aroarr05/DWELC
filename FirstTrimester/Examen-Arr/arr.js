//Autor:Aroa Rivas Rios

document.addEventListener("DOMContentLoaded", () => {
    const countrySelect = document.querySelector("#country-select");
    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

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

    const allGenresCheckbox = document.querySelector("#genders");
    const genreCheckboxes = [...document.querySelectorAll(".genre-checkbox")];

    allGenresCheckbox.addEventListener("change", () => {
        genreCheckboxes.forEach(checkbox => checkbox.checked = allGenresCheckbox.checked);
    });

    genreCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (genreCheckboxes.every(cb => !cb.checked)) {
                allGenresCheckbox.checked = false;
            } else if (genreCheckboxes.every(cb => cb.checked)) {
                allGenresCheckbox.checked = true;
            }
        });
    });

    document.querySelector("#search-button").addEventListener("click", () => {
        const selectedGenres = genreCheckboxes.filter(cb => cb.checked).map(cb => cb.id);
        searchMovies(selectedGenres);
    });
});

function searchMovies(selectedGenres) {
    const name = document.querySelector("#name").value.toLowerCase();
    const titleChecked = document.querySelector("#title").checked;
    const directorChecked = document.querySelector("#director").checked;
    const actorsChecked = document.querySelector("#actors").checked;
    const fromYear = parseInt(document.querySelector("#from-select").value);
    const toYear = parseInt(document.querySelector("#to-select").value);

    const filteredMovies = pelis.filter(movie => {
        const matchesName = movie.Title.toLowerCase().includes(name);
        const matchesGenres = selectedGenres.every(genre => movie.Genre.toLowerCase().split(',').includes(genre.toLowerCase()));
        const movieYear = parseInt(movie.Year);
        const matchesYear = (isNaN(fromYear) || movieYear >= fromYear) && (isNaN(toYear) || movieYear <= toYear);

        return matchesName && matchesGenres && matchesYear;
    });

    const resultMessage = document.querySelector("#result-message");
    const moviesContainer = document.querySelector("#movies-container");

    moviesContainer.innerHTML = '';
    if (filteredMovies.length === 0) {
        resultMessage.textContent = 'No movies found.';
    } else {
        resultMessage.textContent = `${filteredMovies.length} movie(s) found.`;
        filteredMovies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('col-md-4', 'mb-4');
            movieCard.innerHTML = `
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        
                        <!-- GENEROS -->
                        <div class="genres">
                            ${movie.Genre.split(',').map(genre => {
                            return `<span class="badge" style="background-color: #9b59b6; color: white;">${genre.trim()}</span>`;
                            }).join(' ')}
                        </div>
                        
                        <!-- CAMBIAR EL COLOR -->
                        <button class="btn btn-primary change-color-btn">Details</button>
                    </div>
                </div>
            `;
            moviesContainer.appendChild(movieCard);

            const changeColorBtn = movieCard.querySelector(".change-color-btn");
            changeColorBtn.addEventListener("click", () => {
                const currentColor = movieCard.style.backgroundColor;
                if (currentColor === 'rgb(142, 90, 191)') {
                    movieCard.style.backgroundColor = '';
                } else {
                    movieCard.style.backgroundColor = 'lightblue';
                }
            });
        });
    }
}
