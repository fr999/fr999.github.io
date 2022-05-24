
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

    const item = respData.results.find(item => item.id === parseInt(c));

    //const sponsoring = respData.sponso_genre
    showGenre(rst_category)
    showMovies(item, respData);
}

function clonearr(array) {
  array.forEach(function(item, i) {
    
    array[i] = array[i].replace("attachments", "preview");
    });
  return array
}

function showMovies(movies, respData) {
    // clear main
    main.innerHTML = "";

        const { backdrop, sponso, title, genre, version, overview, images, creator , url_creator, url_file, url_translate, creator_translate, version_translate, type_translate, info_translate, threads_translate, release_date} = movies;

        const sponsoring = respData.sponso_genre

        const category_genre = respData.category_genre
        
        const previewimg = clonearr([...images]);

        // const repoLIKE = document.createElement("div");
        // repoLIKE.classList.add("likes");

        var repoLIKE = ``;
        var repoNAME = ``;

        //genre
        genre.forEach((gr) => {
            category_genre.find( function(item) {
                if (item.id == gr) {

                    repoLIKE = repoLIKE +`
                    <div class="like-profile">
                    <img src="https://eu.ui-avatars.com/api/?name=`+item.id+`" alt="" class="like-img">
                   </div>
                    `
                    repoNAME = repoNAME + `<div class="like-name">`+item.name+`</div>`;
                }
             });
        })

        repoLIKE = repoLIKE + repoNAME;
        
        let notversion = ""
        
        if (version_translate && version != version_translate) {
          
          notversion =  '<div class="like-profile"><img title="Version du jeux diffèrente de la traduction" src="https://eu.ui-avatars.com/api/?background=FFA500&name=&#x26A0;" alt="" class="like-img"></div>'
          
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
       <img src="https://eu.ui-avatars.com/api/?name=DE" alt="" class="like-img">
      </div>
        <div class="like-name">Développeur: <span>${creator}</span></div>
      </div>

      <div class="likes">`+ repoLIKE +`</div>
        <div class="book-button">
        <li>
        <a href="${url_file}" target="_blank"><div class="book-see book-yellow">Téléchargement: <span>F95zone</span></div></a>
        </li><li style="flex: auto ;"><a href="${url_file}" target="_blank"><div class="book-see book-pink">Patreon: <span>${creator}</span></div></a>
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
       <img src="https://eu.ui-avatars.com/api/?name=TR" alt="" class="like-img">
      </div>
        <div class="like-name">Traducteur: <span>${creator_translate}</span></div>
      </div>


      <div class="likes">
        <div class="like-profile">
          <img src="https://eu.ui-avatars.com/api/?name=TY" alt="" class="like-img">
        </div>
        ${notversion}
        <div class="like-name">Type: <span>${type_translate}</span></div>
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
    image.onload = function () {
        load.style.display = "none";
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
      
      getLight(item, index+1);
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
      
      getLight(item, index+1);
    });
    
    light.appendChild(prevbutton);

}

function getClose() {
    var light = document.getElementById("lightbox");

    light.style.display = "none";
}


