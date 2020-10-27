
const APIURL = "https://raw.githubusercontent.com/LordVenom/f999/main/_data/com.json";


const main = document.getElementById("main");

//var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href

var c = new URLSearchParams(window.location.search).get("id");
//console.log(c);
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

        const { backdrop, title, version, overview, images, creator , url_creator, url_file, url_translate, creator_translate, version_translate, type_translate, info_translate} = movies;

        const movieEl = document.createElement("div");
        movieEl.classList.add("dialog");

        movieEl.innerHTML = `
            <img class="imgheader"
                src="${backdrop}"
                alt="${title}"
            />
            <div class="dialog-info">
                <h3>${title}</h3>
                <span class="orange">${version}</span>
            </div>

            <div class="dialog-overview float-left">
            ${overview}
            <div class="dialog-desc"><ul>
            <li>- Traduction par: <span class="orange">${creator_translate}</span></li>
            <li>- Version: <span class="orange">${version_translate}</span></li>
            <li>- Type: <span class="orange">${type_translate}</span></li>
            <li><span class="dialog-more"><span class="orange">+ Info</span></li>
            <li><textarea class="hidden">${info_translate}</textarea></li>
            </ul></div>
            </div>
        
 
            <div class="dialog-image">
            <img src="${images[0]}">
            <img src="${images[1]}">
            <img src="${images[2]}">
            <img src="${images[3]}">
            </div>
            <div class="spacer"></div>
            <div class="dialog-button">
            <p><a href="${url_creator}" target="_blank" class="button">Auteur: <span>${creator}</span></a></p>
            <p><a href="${url_file}" target="_blank" class="button">Game: <span>F95zone</span></a></p>
            <p><a href="${url_translate}" target="_blank" class="button">Tradution: <span>F95zone</span></a></p>
            </div>
        `;

        const imglight = movieEl.querySelector(".dialog-image");
        const moreEl = movieEl.querySelector(".dialog-more");
        const textArea = movieEl.querySelector("textarea");

        imglight.addEventListener("click", (e) => {
            getLight(e.target.src)
        });
    
        moreEl.addEventListener("click", () => {
            textArea.classList.toggle("hidden");
        });

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


