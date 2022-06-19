
const APIURL = "https://raw.githubusercontent.com/fr999/fr999.github.io/main/_data/com.json";


const main = document.getElementById("main");

const selectHM = document.getElementById("filter_options");


//const filter_toogle = document.getElementById("filter_toogle");

const filterHM = document.getElementById("filters-container");

const sliderHM = document.getElementById("slider");
//const sliderHMIMG = document.getElementById("slider_img");


const NumberByPage = Number(10);



//const myParam = urlParams.get('q');
//var c = url.searchParams.get("c");

//cookie
// const cok = Cookies.get('container');
// if (cok) {
//     document.body.style.backgroundColor = cok;
// }


// light
// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>

//dark
// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> */}

//url.URLSearchParams.has()
// initially get fav movies
getMovies(APIURL, "", "");


async function getMovies(url, searchTerm, catTerm) {

    const resp = await fetch(url);
    const respData = await resp.json();
    var result = respData.results;
    
    
    //local
    //var result = com['results'];
    //const rst_category = com['category_genre'];
   
    
    const rst_category = respData.category_genre;
    showGenre(rst_category);
    

    if (urlParams.has('q')) {
        searchTerm = urlParams.get('q')
        
        const searchHM = document.getElementById("search");
        search.value = searchTerm

        result = result.filter(el => el.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (urlParams.has('c')) {
        catTerm = urlParams.getAll('c')

        result = result.filter(el => el.genre.toString().includes(catTerm))
  
    }

    if (urlParams.has('t')) {
        triTerm = urlParams.get('t')
        switch (triTerm) {
            case 'genre_title':
              result = result.sort((a, b) => a.title.localeCompare(b.title))
              break;
            case 'genre_release_date':
                result = result.sort((a, b) => a.release_date.localeCompare(b.release_date))
                break;
            case 'genre_vote_count':
                result = result.sort((a, b) => a.vote_count.toString().localeCompare(b.vote_count.toString()))
                break;
            case 'genre_version':
                result = result.sort((a, b) => a.version.localeCompare(b.version))
                break;
            case 'genre_creator':
                result = result.sort((a, b) => a.creator.localeCompare(b.creator))
                break;
            default:
                result = result.sort((a, b) => a.title.localeCompare(b.title))
          }
        }
        

    if (main){
      
        var nextPage = Number(numPage) + NumberByPage;
        
      
        showNav(result.length)
        
        //trie par date
        result = result.sort((a, b) => b.release_date.localeCompare(a.release_date))
      
        result = result.slice(numPage, nextPage);
        
        //load slider et select
        slider =  [...result];
        showSlider(slider);
        
        showMovies(result);
    }
}

function showSlider(sliders) {
    // clear main
    var timer = 0;
    var count = 0;
    var max_count = sliders.length;
    
    
    //sliderHM
    
    let randslide = sliders.sort(() => 0.5 - Math.random())[0];
    
    //sliderHMIMG.src = randslide.backdrop;
    
    sliderHM.innerHTML = `<a href="info.html?id=${randslide.id}" data-title="${randslide.title}"><div class="slide block active" style="background: url(${randslide.backdrop}) no-repeat center center; background-size: cover;"></div></a>`

    

}

function showSlider2(sliders) {
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

function showSlider3(sliders) {
    // clear main
    var timer = 0;
    var count = 0;
    var max_count = sliders.length;
    // console.log(max_count)
    
    list = sliders.sort(() => Math.random() - 0.5)
    
    
    const backdrop = list[0]['backdrop'];
    
    
    sliderHM.innerHTML = `<div class="slide block active" style="background: url(${backdrop}) no-repeat center center; background-size: cover;"></div>`
    //sliderHM

    // sliders.forEach((slider) => {
    //     const { backdrop } = slider;
        
    //     //const backdrop2 = backdrop.replace("attachments", "preview");
        
    //     sliderHM.innerHTML += `<div class="slide block" style="background: url(${backdrop}) no-repeat center center; background-size: cover;"></div>`
        
        
    //     supernova_slider();
        

    //     // console.log(backdrop)

    // });
}

function supernova_slider() {
    let slide = document.querySelectorAll(".slide"),
        i = 0;

        function next()  {
          slide[i].classList.remove("active");
          i++;
  
          if (i >= slide.length) {
              i = 0;
          }
  
          slide[i].classList.add("active");
          
          
        };



    slider_callback();
    let sliderInterval = window.setInterval(slider_callback, 20000);

    function slider_callback() {
        next();
    }
}

function ToCard_sauv(repos) {

    // selectHM.addEventListener("change", e => {
        
    //     const current = urlParams.get('c');
  
    //     if (e.target.checked === false) {
    //             urlParams.delete('c');
    //     } else {
    //             urlParams.set('c', e.target.value);

    //     }
    //     window.location.search = urlParams;

    // });


    //selectHM.innerText = null;
    selectMENU.innerText = null;
    //category.appendChild(selectHM);

    var search_ids = urlParams.get('c')

    repos.forEach((repo) => {

            const { id, name } = repo;

            const repoLI = document.createElement("li");
            
            const repoEl = document.createElement("a");
            

            //repoEl.type = "checkbox";
            repoEl.href = "?c="+id;
            repoEl.value = id;
            repoEl.text = name;
            repoEl.id = "id" + id;

            if (search_ids == id) {
                //repoEl.class = "active";
                repoEl.classList.add("active");
                //repoEl.checked = true;
                //filterHM.style.display = 'block'
            }

            // if(search_ids.toString().includes(''+id+'')){
            //     repoEl.checked = true;
            // } else {
            //     repoEl.checked = false;
            // }

            //repoLI.innerHTML = name;

            repoLI.appendChild(repoEl)
            //selectHM.appendChild(repoLI);
            selectMENU.appendChild(repoLI)
        });
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { id, backdrop, title, version, release_date, creator, creator_translate, version_translate } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("book-card");
        
        let notversion = ""
        
        if (version_translate && version != version_translate) {
          
          notversion =  '<div class="like-profile yellow" data-title="Version du jeux diffèrente de la traduction"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>'
          
        }
        
        //<a href="info.html?id=${id}&page=${numPage}&c=${catPage}&url=${urlParams}">
        const backdrop2 = backdrop.replace("attachments", "preview");
        

        movieEl.innerHTML = `<a href="info.html?id=${id}&${urlParams}">
            <div class="content-wrapper"><div class="content-image">
            <img
                src="${backdrop2}"
                alt="${title}"
                class="book-card-img"
            /></div></div>
            <div class="card-content">
            <div class="book-name">${title}</div>
            <div class="book-by">${release_date}</div>
            <span class="book-version">${version}</span>
            </div>
            <div class="likes">
            <div class="like-profile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            ${notversion}
            <div class="like-name">Développeur:&ensp;<span>${creator}</span>&emsp;|&emsp;Traducteur:&ensp;<span>${creator_translate}</span></div>
          </div>
        `;

        main.appendChild(movieEl);
    });
}


// filter_toogle.addEventListener("click", function() {

//     if (filterHM.style.display !== 'none') {
//         filterHM.style.display = 'none';
//     }
//     else {
//         filterHM.style.display = 'block';
//     }

// });


// let listRight = document.querySelectorAll('.right-dot li');

// listRight.forEach((item, index) => {
//   item.addEventListener('click', (event) => {
//     event.preventDefault();

//     const val = item.style.backgroundColor;

//     document.body.style.backgroundColor = val;

//     Cookies.set('container', val, { expires: 7 });

   
//   });
// });
