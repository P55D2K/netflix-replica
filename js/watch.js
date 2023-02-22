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

async function getmoviebyid(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b08ef18e709931a1e3de3ab143ed2d2c&language=en-US&append_to_response=release_dates`);
    const data = await response.json();
    return data;
}

async function getmovieagerating(id) {
    const data = await getmoviebyid(id);
    const certification = data.release_dates.results.find(country => country.iso_3166_1 === 'US').release_dates[0].certification;
    return certification;
}

function replacemovieplay(_movielink) {
    return movieplay.replace('{movielink}', _movielink);
}

function bodystart() {
    getmovieagerating(105).then(certification => console.log(certification));
}

window.onload = function() {
    bodystart();
};