
const APIURL = "https://raw.githubusercontent.com/LordVenom/f999/main/_data/com.json";


const main = document.getElementById("main");
const form = document.getElementById("search_form");
const search = document.getElementById("search");

const sliderHM = document.getElementById("slider");
const sliderHMIMG = document.getElementById("slider_img");


// initially get fav movies
getMovies(APIURL, "");

async function getMovies(url, searchTerm) {

    const resp = await fetch(url);
    const respData = await resp.json();
    var result = respData.results;
    const category = respData.category_genre;

    showSlider(result)
    //ToCard(category)
    

    if (searchTerm) {
        //console.log(searchTerm)
        //result = [respData.results.find(el => el.title === searchTerm)];
        //result = respData.results.filter(el => el.title === searchTerm);
        //result = respData.results.filter(el=>el.title.indexOf(searchTerm) !== -1);

        result = respData.results.filter(el => el.title.toLowerCase().includes(searchTerm.toLowerCase()))

    }

    showMovies(result);
}


function showSlider(sliders) {
    // clear main
    var timer = 0;
    var count = 0;
    var max_count = sliders.length;
    // console.log(max_count)

    sliders.forEach((slider) => {
        const { backdrop } = slider;

        sliderHMIMG.style.filter = "blur(0px)";
        sliderHMIMG.src = backdrop;
        setTimeout(function() {
            // sliderHMIMG.classList.remove("in_blur");
            // sliderHMIMG.classList.add("out_blur");
            sliderHMIMG.style.filter = "blur(80px)";
        }, (8000)); 
        

        setTimeout(function() {
            count++;

            // document.getElementById("myImg").style.filter = "blur(80px)";
            sliderHMIMG.style.filter = "blur(0px)";

            sliderHMIMG.src = backdrop;
            

            setTimeout(function() {
                sliderHMIMG.style.filter = "blur(80px)";
            }, (8000)); 
            
            if(count >= max_count) {
                showSlider(sliders)
              }

        }, timer += 10000);

        // console.log(backdrop)

    });
}

function ToCard(repos) {
    const reposEl = document.getElementById("repos");

    var selectList = document.createElement("select");
    selectList.id = "mySelect";
    reposEl.appendChild(selectList);

    console.log("ttt" +repos.length)

    for (var i = 0; i < repos.length; i++) {
        console.log(i);
      }

    repos.forEach((repo) => {

            const { value } = repo;

   

            const repoEl = document.createElement("option");
            repoEl.classList.add("repo");

            repoEl.value = repo[0];
            repoEl.text = repo[1];

            selectList.appendChild(repoEl);
        });
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