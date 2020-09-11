
const APIURL = "https://raw.githubusercontent.com/LordVenom/f999/master/_data/com.json";


const main = document.getElementById("main");


// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    //console.log(respData);

    showMovies(respData.results);
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


