
const APIURL = "https://raw.githubusercontent.com/LordVenom/f999/main/_data/com.json";


const main = document.getElementById("main");
const form = document.getElementById("search_form");
const search = document.getElementById("search");

const selectHM = document.getElementById("filter_options");

//const filter_toogle = document.getElementById("filter_toogle");



const sliderHM = document.getElementById("slider");
const sliderHMIMG = document.getElementById("slider_img");

//url arg
const urlParams = new URLSearchParams(window.location.search);
const seperator = ",";
//const myParam = urlParams.get('q');

//var c = url.searchParams.get("c");
//url.URLSearchParams.has()
// initially get fav movies
getMovies(APIURL, "", "");


async function getMovies(url, searchTerm, catTerm) {

    const resp = await fetch(url);
    const respData = await resp.json();
    var result = respData.results;
    const rst_category = respData.category_genre;

    //load slider et select
    showSlider(result)
    ToCard(rst_category)

    if (urlParams.has('q')) {
        searchTerm = urlParams.get('q')
        
        const searchHM = document.getElementById("search");
        search.value = searchTerm

        result = respData.results.filter(el => el.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (urlParams.has('c')) {
        catTerm = urlParams.get('c')

        result = respData.results.filter(el => el.genre.toString().includes(catTerm))
  
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

    selectHM.addEventListener("change", e => {
        
        const current = urlParams.get('c');
  

        if (e.target.checked === false) {

            const parts = current.split(seperator);
            const index = parts.indexOf(e.target.value);
            parts.splice(index, 1);

            if(parts.length === 0) {
                // if nothing is left delete the parameter
                urlParams.delete('c');
              }else{
                // overwrite with the updated value
                urlParams.set('c', parts.join(seperator));
              }
            
        } else {

            if (urlParams.has('c')) {
                // get saved value
                
                // combine saved and new value
                const extra = current + seperator + e.target.value;
                // overwrite old value
                urlParams.set('c', extra);
              } else {
                urlParams.append('c', e.target.value);
              }
        }
        //getMovies(APIURL, "", "1");
        //urlParams.append('c', e.target.value);
        window.location.search = urlParams;

    });


    selectHM.innerText = null;
    //category.appendChild(selectHM);

    var search_ids = urlParams.getAll('c')

    repos.forEach((repo) => {

            const { id, name } = repo;

            const repoLI = document.createElement("li");
            
            const repoEl = document.createElement("input");
            repoEl.classList.add("repo");

            repoEl.type = "checkbox";
            repoEl.value = id;
            repoEl.text = name;
            repoEl.id = "id" + id;

            if(search_ids.toString().includes(''+id+'')){
                repoEl.checked = true;
            } else {
                repoEl.checked = false;
            }

            repoLI.innerHTML = name;

            repoLI.appendChild(repoEl)
            selectHM.appendChild(repoLI);
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
        //getMovies(APIURL, searchTerm);
        urlParams.set('q', searchTerm);
        window.location.search = urlParams;

        search.value = "";
    }
});


// filter_toogle.addEventListener("click", function() {
        
//     const filterHM = document.getElementById("filters-container");

//     if (filterHM.style.display !== 'none') {
//         filterHM.style.display = 'none';
//     }
//     else {
//         filterHM.style.display = 'block';
//     }

// });



