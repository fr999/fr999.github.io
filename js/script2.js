
const APIURL = "https://raw.githubusercontent.com/LordVenom/f999/main/_data/com.json";


const main = document.getElementById("main");

const header = document.getElementById("header-container");
const sliderHMIMG = document.getElementById("slider_img");

const selectHM = document.getElementById("filter_options");


//var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href

var c = new URLSearchParams(window.location.search).get("id");
//console.log(c);
// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    const item = respData.results.find(item => item.id === parseInt(c));

    //const sponsoring = respData.sponso_genre

    showMovies(item, respData);
}

function showMovies(movies, respData) {
    // clear main
    main.innerHTML = "";

        const { backdrop, sponso, title, genre, version, overview, images, creator , url_creator, url_file, url_translate, creator_translate, version_translate, type_translate, info_translate, threads_translate} = movies;

        const sponsoring = respData.sponso_genre

        const category_genre = respData.category_genre

        //genre
        //const repoDIV = document.createElement("ul");
        //repoDIV.classList.add("filter_options");
        let test = []
        genre.forEach((gr) => {
            //console.log(gr)
            category_genre.find( function(item) { 
                if (item.id == gr) {
                    const repoLI = document.createElement("li");
                    repoLI.innerHTML = item.name;
                    selectHM.appendChild(repoLI); 
                    //test.push(item.name)
                }
             } );
        })

        //main.appendChild(repoDIV);


        sliderHMIMG.src = backdrop;

        header.getElementsByTagName('h1')[0].innerHTML = `${title}`;
        header.getElementsByTagName('p')[0].innerHTML = `[ Version ${version} ]`;

        const movieEl1 = document.createElement("div");
        movieEl1.classList.add("dialog");

        movieEl1.innerHTML += `
        <div class="dialog-desc"><ul>
        <li><span>Jeux:</span></li>
        <li><p>${overview}</p></li>
        <li><span>Version: <div class="blue">${version}</span></li>
        <li><span>Auteur: <div class="blue"><a href="${url_creator}" target="_blank">${creator}</a></div></span></li>
        </div>


        <div class="button"><a href="${url_file}" target="_blank">Téléchargement: <span>F95zone</span></a></div>
        `
        main.appendChild(movieEl1);

        //img
        const movieEl2 = document.createElement("div");
        movieEl2.classList.add("dialog");

        movieEl2.innerHTML += `
        <div class="dialog-image">
            <img src="${images[0]}">
            <img src="${images[1]}">
            </div>`

        const imglight = movieEl2.querySelector(".dialog-image");

        imglight.addEventListener("click", (e) => {
            getLight(e.target.src)
        });
        main.appendChild(movieEl2);

        //img2
        const movieEl3 = document.createElement("div");
        movieEl3.classList.add("dialog");

        movieEl3.innerHTML += `
        <div class="dialog-image">
            <img src="${images[2]}">
            <img src="${images[3]}">
            </div>`

        const imglight2 = movieEl3.querySelector(".dialog-image");

        imglight2.addEventListener("click", (e) => {
            getLight(e.target.src)
        });
        main.appendChild(movieEl3);

        //
        const movieEl = document.createElement("div");
        movieEl.classList.add("dialog");

        movieEl.innerHTML = `
            <div class="dialog-desc"><ul>
            <li><span>Traduction:</span></li>
            <li><p>${info_translate}</p></li>
            <li><span>Version: <div class="blue">${version_translate}</span></li>
            <li><span>Auteur: <div class="blue">${creator_translate}</div></span></li>
            <li><span>Type: <div class="blue">${type_translate}</span></li>
            <li><span>Lien sponso: <div class="blue">${sponsoring[0][sponso]}</span></li>
            </ul></div>
        
            <div class="button"><a href="${url_translate}" target="_blank">Téléchargement</a></div>
            <div class="button"><a href="${threads_translate}" target="_blank">Discussion: <span>F95ZONE</span></a></div>
            `;



        main.appendChild(movieEl);
}



function getLight(imag) {
    var light = document.getElementById("lightbox");

    light.style.display = "block";

    light.innerHTML = `<div class="light"><img src="${imag}" /></div>`
    light.addEventListener("click", getClose);

}

function getClose() {
    var light = document.getElementById("lightbox");

    light.style.display = "none";
}

//cookie
const cok = Cookies.get('container');

if (cok) {
    var bg = document.getElementsByClassName("container")
    bg[0].style.backgroundColor = cok;
    document.body.style.backgroundColor = cok;
}


