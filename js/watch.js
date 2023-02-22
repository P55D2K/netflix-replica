// havent done movies like this

// API endpoint for retrieving search results
const apiEndpoint = "https://api.themoviedb.org/3/search/movie?api_key=b08ef18e709931a1e3de3ab143ed2d2c&query=";

// API endpoint for retrieving images
const apiEndpointImages = "https://image.tmdb.org/t/p/original";

// API endpoint for movie genres
const apiGenres = "https://api.themoviedb.org/3/genre/tv/list?api_key=b08ef18e709931a1e3de3ab143ed2d2c&language=en-US";

const fullStarCode = "<li><i class='fa fa-star'></i></li>";
const halfStarCode = "<li><i class='fa fa-star-half'></i></li>";

const movieplay = '<a href="{movielink}" class="btn btn-hover iq-button"><i class="fa fa-play mr-3"></i>Play Now</a>';

const urlParams = new URLSearchParams(window.location.search);
let trailerlink = urlParams.get('trailerlink');
let trailer = urlParams.get('trailer');
let id = urlParams.get('id');

let insertmovieplay = document.getElementById('insertmovieplay');
let ratingstars = document.getElementById('ratingstars');
let movierating = document.getElementById('movierating');
let agerating = document.getElementById('agerating');
let genres = document.getElementById('genres');

function sortbydescendingid(_list) {
    let _newlist = _list;
    let idarranged = [];
    for (let i = 0; i < _list.length; i++) {
        idarranged.push(_list[i].id);
    }
    console.log(idarranged);
    console.log(_newlist);
    idarranged = (idarranged.slice().sort((a, b) =>  a - b)).reversed();
}

function replacemovieplay(_movielink) {
    return movieplay.replace('{movielink}', _movielink);
}

function bodystart() {
    fetch(apiEndpoint + 'avengers')
        .then(response => response.json())
        .then(data => {
            movies = data.results;
            console.log(movies);
            sortbydescendingid(movies);
        });
}

window.onload = function() {
    bodystart();
};