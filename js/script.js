
const APIURL = "https://raw.githubusercontent.com/LordVenom/f999/main/_data/com.json";


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


// initially get fav movies
getMovies(APIURL, "");

async function getMovies(url, search) {
    const resp = await fetch(url);
    const respData = await resp.json();
    var result = respData.results;

    if (search) {
        result = [respData.results.find(el => el.title === search)];  
    }

    showMovies(result);
}


function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { id, backdrop, title, version } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <a href="info.html?id=${id}"><img
                src="${backdrop}"
                alt="${title}"
            /></a>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="orange">${version}</span>
            </div>
        `;

        main.appendChild(movieEl);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(APIURL, searchTerm);

        search.value = "";
    }
});


