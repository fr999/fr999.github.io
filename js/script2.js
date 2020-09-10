//const APIURL =  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const APIURL = "https://raw.githubusercontent.com/LordVenom/f999/master/_data/com.json";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href

var c = new URLSearchParams(window.location.search).get("id");
console.log(c);
// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    const item = respData.results.find(item => item.id === parseInt(c));
    

    

    showMovies(item);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

        const { backdrop, title, version, overview, images } = movies;

        const movieEl = document.createElement("div");
        movieEl.classList.add("dialog");

        movieEl.innerHTML = `
            <img
                src="${backdrop}"
                alt="${title}"
            />
            <div class="dialog-info">
                <h3>${title}</h3>
                <span class="orange">${version}</span>
            </div>
            <div class="dialog-overview">
            ${overview}
            </div>
            <div class="dialog-image">
            <a href="javascript:void(0)"><img onclick="getLight(this.src)" src="${images[0]}"></a>

            <a href="javascript:void(0)"><img onclick="getLight(this.src)" src="${images[1]}"></a>
            <a href="javascript:void(0)"><img onclick="getLight(this.src)" src="${images[2]}"></a>
            <a href="javascript:void(0)"><img onclick="getLight(this.src)" src="${images[3]}"></a>
            </div>
            <div class="spacer"></div>
            <div class="dialog-button">
            <p><button>Auteur: <span>Hover</span></button></p>
            <p><button>Jeux: <span>F95</span></button></p>
            <p><button>Traduction: <span>F95</span></button></p>
            </div>
        `;

        main.appendChild(movieEl);
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}


function getLight(imag) {
    var light = document.getElementById("lightbox");

    light.style.display = "block";

    const imgEl = document.createElement("div");
    light.innerHTML = `<img src="${imag}" /> `
    light.addEventListener("click", getClose);

}

function getClose() {
    var light = document.getElementById("lightbox");

    light.style.display = "none";
}


