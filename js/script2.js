
const APIURL = "https://raw.githubusercontent.com/fr999/fr999.github.io/main/_data/com.json";


const main = document.getElementById("main");

const header = document.getElementById("header-container");

const sliderHMIMG = document.getElementById("slider_img");

const sliderHM = document.getElementById("slider");

const selectHM = document.getElementById("filter_options");




//var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href


var c = urlParams.get("id");
//console.log(c);
// initially get fav movies


showNavInfo();

getMovies(APIURL);

async function getMovies(url) {
    
    const resp = await fetch(url);
    const respData = await resp.json();
    
    const rst_category = respData.category_genre;
    var result = respData.results;
    
    //local
    //var result = com['results']
    //const rst_category = com['category_genre'];

    const item = result.find(item => item.id === parseInt(c));

    //const sponsoring = respData.sponso_genre
    showGenre(rst_category)
    showMovies(item);
}

function clonearr(array) {
  array.forEach(function(item, i) {
    
    array[i] = array[i].replace("attachments", "preview");
    });
  return array
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

        const { backdrop, sponso, title, genre, version, overview, images, creator , url_creator, url_file, url_translate, creator_translate, version_translate, type_translate, info_translate, threads_translate, release_date} = movies;

        //const sponsoring = respData.sponso_genre

        //const category_genre = respData.category_genre
        
        const previewimg = clonearr([...images]);

        // const repoLIKE = document.createElement("div");
        // repoLIKE.classList.add("likes");

        var repoLIKE = `<div class="like-profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></div>`;
        var repoNAME = ``;

        //genre
        genre.slice(0, 5).forEach((gr) => {
            
            //category_genre.find( function(item) {
                //if (item.id == gr) {


                    
                    repoNAME = repoNAME + `<div class="like-name">`+gr+`</div>`;
                //}
             //});
        })
        
        if (genre.length > 5) {
          
          repoNAME  = repoNAME + '<div class="like-name" data-genre="'+genre+'">plus...</div>';
        }
        

        repoLIKE = repoLIKE + repoNAME;
        
        let notversion = ""
        
        if (version_translate && version != version_translate) {
          
          notversion =  '<div class="like-profile yellow" data-title="Version du jeux diffèrente de la traduction"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>'
          
        }

        //sliderHMIMG.src = backdrop;
        sliderHM.innerHTML += `<div class="slide block active" style="background: url(${backdrop}) no-repeat center center; background-size: cover;"></div>`


        //header.getElementsByTagName('h1')[0].innerHTML = `${title}`;
        //header.getElementsByTagName('p')[0].innerHTML = `[ Version ${version} ]`;

        //${sponsoring[0][sponso]}
        
        const movieEl1 = document.createElement("div");
        movieEl1.classList.add("book-card");

        movieEl1.innerHTML += `
        <div class="content-wrapper">
        <div class="dialog-image"><div class="content-image">
        <img
            src="${previewimg[0]}"
            alt="${title}"
            data-src="${images[0]}"
            class="book-card-img-info"
        /></div></div></div>
        <div class="card-content">
        <div class="book-name">${title}</div>
        <div class="book-by">${release_date}</div>
        <span class="book-version">${version}</span>
        </div>

        <div class="book-sum">${overview}</div>

        <div class="likes">
        <div class="like-profile">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
      </div>
        <div class="like-name">Développeur:&ensp;<span>${creator}</span></div>
      </div>

      <div class="likes">`+ repoLIKE +`</div>
        <div class="book-button">
        <li>
        <a href="${url_file}" target="_blank"><div class="book-see book-yellow">Téléchargement: <span>F95zone</span></div></a>
        </li><li style="flex: auto ;"><a href="${url_creator}" target="_blank"><div class="book-see book-pink">Soutenir: <span>${creator}</span></div></a>
        </li></div>`

        // const imglight1 = movieEl1.querySelector(".dialog-image");

        // imglight1.addEventListener("click", (e) => {
        //     getLight(e.target.src)
        // });
        main.appendChild(movieEl1);

        //img
        const movieEl2 = document.createElement("div");
        movieEl2.classList.add("book-card");

        movieEl2.innerHTML += `
            <div class="dialog-image">
            <div class="content-image2"><img src="${previewimg[1]}" data-src="${images[1]}" class="book-card-img-info2"></div>
            <div class="content-image2"><img src="${previewimg[2]}" data-src="${images[2]}" class="book-card-img-info2"></div>
            </div>`

        // const imglight2 = movieEl2.querySelector(".dialog-image");

        // imglight2.addEventListener("click", (e) => {
        //     getLight(e.target.src)
        // });
        main.appendChild(movieEl2);

        //img2
        const movieEl3 = document.createElement("div");
        movieEl3.classList.add("book-card");

        movieEl3.innerHTML += `
        <div class="dialog-image">
            <div class="content-image2"><img src="${previewimg[3]}" data-src="${images[3]}" class="book-card-img-info2"></div>
            <div class="content-image2"><img src="${previewimg[4]}" data-src="${images[4]}" class="book-card-img-info2"></div>
            </div>`

        // const imglight3 = movieEl3.querySelector(".dialog-image");

        // imglight3.addEventListener("click", (e) => {
        //     getLight(e.target.src)
        // });
        main.appendChild(movieEl3);

        //
        const movieEl4 = document.createElement("div");
        movieEl4.classList.add("book-card");

        movieEl4.innerHTML = `
        <div class="content-wrapper">
        <div class="dialog-image"><div class="content-image">
            <img
                src="${previewimg[5]}"
                alt="${title}"
                data-src="${images[5]}"
                class="book-card-img-info"
            /></div></div></div>
        <div class="card-content">
        <div class="book-name">Traduction</div>
        <span class="book-version">${version_translate}</span>
        </div>

        <div class="book-sum">${info_translate}</div>

        <div class="likes">
        <div class="like-profile">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
      </div>
        <div class="like-name">Traducteur:&ensp;<span>${creator_translate}</span></div>
      </div>


      <div class="likes">
        <div class="like-profile">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </div>
        ${notversion}
        <div class="like-name">Type:&ensp;<span>${type_translate}</span></div>
      </div>

      <div class="book-button">
      <li>
      <a href="${url_translate}" target="_blank"><div class="book-see book-blue">Téléchargement</div></a>
      </li><li><a href="${threads_translate}" target="_blank"><div class="book-see book-purple">Discussion: <span>F95zone</span></div></a>
      </li></div>`;

      // const imglight4 = movieEl4.querySelector(".dialog-image");

      // imglight4.addEventListener("click", (e) => {
      //     getLight(e.target.src)
      // });

        main.appendChild(movieEl4);
        
        
        
      const imglight = main.querySelectorAll(".dialog-image img");
      
      //console.log(imglight)
      
      imglight.forEach((item, index) => {
        item.addEventListener('click', (event) => {
        event.preventDefault();
      
        getLight(imglight, index);
      
     
        });
      });

      // imglight4.addEventListener("click", (e) => {
      //     getLight(e.target.src)
      // });
}



function getLight(item, index) {
    var light = document.getElementById("lightbox");
    //clear doc
    light.innerHTML = '';

    light.style.display = "block";
    
    if (!item) { return }
    
    img = item[index].dataset.src;
    
    const disp = document.createElement("div");
    disp.classList.add("light");
    
    
    //loading
    const load = document.createElement("span");
    load.classList.add("spanloader");
    
    load.innerHTML = `Loading...`
    
    disp.appendChild(load);
    
    
    var image = new Image();
    image.id = "lightimg";
    image.onload = function () {
        load.style.display = "none";
        image.classList.add('show');
    };
    image.src = img;
    
    disp.appendChild(image);
    
    //disp.innerHTML += `<img src="${img}" />`;

    //light.innerHTML = `<div class="light"><img src="${img}" />`
    disp.addEventListener("click", getClose);
    light.appendChild(disp);
    
    const nextbutton = document.createElement("div");
    nextbutton.innerHTML = `<button class="light-next">></button>`;
    //nextbutton.addEventListener("click", getLight(item));
    
    nextbutton.addEventListener("click", function() {

      
      if(index >= item.length -1){
        index = -1;
      }
      
      image.classList.add('hide');
      setTimeout(function() { getLight(item, index+1); }, 200);
      
    });
    
    light.appendChild(nextbutton);
    
    
    //prev
    const prevbutton = document.createElement("div");
    prevbutton.innerHTML = `<button class="light-prev"><</button>`;
    //nextbutton.addEventListener("click", getLight(item));
    
    prevbutton.addEventListener("click", function() {

      
      if(index >= item.length -1){
        index = -1;
      }
      
      image.classList.add('hide');
      setTimeout(function() { getLight(item, index+1); }, 200);
      
    });
    
    light.appendChild(prevbutton);

}

function getClose() {
    const light = document.getElementById("lightbox");
    const lightimg = document.getElementById("lightimg");
    
    lightimg.classList.add('hide');
    
    setTimeout(function() { light.style.display = "none"; }, 500);

    
}
