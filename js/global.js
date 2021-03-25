//menu sort
let sortMENU = document.querySelectorAll('.book-types a');

sortMENU.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();

    urlParams.set('t', item.id)

    window.location.search = urlParams;

   
  });
});


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


//mode couleur

if (localStorage.getItem('theme')) {
    const color = localStorage.getItem('theme');
    document.documentElement.setAttribute("data-theme", color)
}

let color = ['none', 'dark', 'light-blue', 'light-green', 'grey', 'deep-purple', 'deep-orange']

const DarkLight = document.getElementById("color");

DarkLight.addEventListener("click", function(e) {

    if (localStorage.getItem('theme')) {

            const currentIndex = color.indexOf(localStorage.getItem('theme'));
            const nextIndex = (currentIndex + 1) % color.length;
            const next = color[nextIndex];

            document.documentElement.setAttribute("data-theme", next)
            localStorage.setItem('theme', next);

            console.log(nextIndex + next)
        }
        else {
            document.documentElement.setAttribute("data-theme", "dark")
            localStorage.setItem('theme', 'dark');
        }

});