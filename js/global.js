//menu sort
let sortMENU = document.querySelectorAll('.book-types a');

sortMENU.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();

    urlParams.set('t', item.id)

    window.location.search = urlParams;

   
  });
});


const urlParams = new URLSearchParams(window.location.search);
//menu navigation
//page next and previos
if (urlParams.has('page')) {
  
  numPage = urlParams.get('page')
  
  //navigation.innerHTML += `<a href="javascript:void(0)" id="0" class="book-type">Page: 1</a>`

} else {
  numPage = 0;
  //navigation.innerHTML += `<a href="javascript:void(0)" id="0" class="book-type active">1</a>`
}



function showNav(num) {
  
        var navigation = document.getElementById("previous");
        
        var prevpage = Number(numPage) - NumberByPage;
        var nextpage = Number(numPage) + NumberByPage;
        
        var numberpage = Math.ceil(Number(num) / NumberByPage);
        
        
        
        navigation.innerHTML += `<a href="javascript:void(0)" id="${prevpage}" class="book-type">Précédent</a>`
        navigation.innerHTML += `<a href="javascript:void(0)" id="${nextpage}" class="book-type">Suivant</a>`
        
        if (numPage == 0){
             navigation.innerHTML += `<a href="javascript:void(0)" id="0" class="book-type active">1 / ${numberpage}</a>`
          
        }
  
  
        for (var i = NumberByPage; i < num; i=i+NumberByPage) {
        
        numbers = i.toString().slice(0, -1);
        numbers = parseInt(numbers)+1;
        
        if (i == numPage) {
          navigation.innerHTML += `<a href="javascript:void(0)" id="${i}" class="book-type active">${numbers} / ${numberpage}</a>`
        }
        
        
      }
      
        navigation.addEventListener("click", (e) => {
          
          if (e.target.id <= 0) {
            urlParams.delete('page');
            
          } else {
            urlParams.set('page', e.target.id)
          }

        window.location.search = urlParams;
        });
  
  
}

function showNavInfo() {
  
  var navigation = document.getElementById("previous");
  navigation.innerHTML += `<a href="javascript:void(0)" id="${numPage}" class="book-type">Retour</a>`
   
  navigation.addEventListener("click", (e) => {
    urlParams.delete('id');
  
  if (e.target.id <= 0) {
    urlParams.delete('page');
    
  } else {
    urlParams.set('page', e.target.id)
  }
  
 

  window.location.href = "index.html?"+urlParams;
  });
  
}


//menu genre
const selectMENU = document.getElementById("menu");

function showGenre(repos) {

    //selectHM.innerText = null;
    selectMENU.innerText = null;
    //category.appendChild(selectHM);

    var search_ids = urlParams.get('c')

    repos.forEach((repo) => {

            const { id, name } = repo;

            const repoLI = document.createElement("li");
            
            const repoEl = document.createElement("a");
            

            //repoEl.type = "checkbox";
            repoEl.href = "index.html?c="+id;
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

//url arg
//const urlParams = new URLSearchParams(window.location.search);

const form = document.getElementById("search_form");
const search = document.getElementById("search");

form.addEventListener("submit", (e) => {

    e.preventDefault();
    const searchTerm = search.value;
   
    if (searchTerm) {
        //getMovies(APIURL, searchTerm);
        urlParams.delete('c');
        urlParams.delete('id');
        urlParams.set('q', searchTerm);

        window.location = 'index.html?'+urlParams;

        search.value = "";
    }
});


//genre menu
const menugenre = document.getElementById("menugenre");
menugenre.addEventListener("click", function(e) {
  
    const menuToggle = document.getElementById("menuToggle");
    menuToggle.className = menuToggle.className !== 'show' ? 'show' : 'hide';
    //menuToggle.style.display = menuToggle.style.display !== 'block' ? 'block' : 'none';


});

//mode couleur

if (localStorage.getItem('theme')) {
    const color = localStorage.getItem('theme');
    document.documentElement.setAttribute("data-theme", color)
}

let color = ['none', 'dark', 'grey', 'deep-red', 'deep-orange', 'light-green', 'light-blue', 'deep-blue', 'deep-purple']

const DarkLight = document.getElementById("color");

DarkLight.addEventListener("click", function(e) {

    if (localStorage.getItem('theme')) {

            const currentIndex = color.indexOf(localStorage.getItem('theme'));
            const nextIndex = (currentIndex + 1) % color.length;
            const next = color[nextIndex];

            document.documentElement.setAttribute("data-theme", next)
            localStorage.setItem('theme', next);

            /*console.log(nextIndex + next)*/
        }
        else {
            document.documentElement.setAttribute("data-theme", "dark")
            localStorage.setItem('theme', 'dark');
        }

});
