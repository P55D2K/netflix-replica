// havent done movies like this

// API endpoint for retrieving search results
const apiEndpoint = "https://api.themoviedb.org/3/search/movie?api_key=b08ef18e709931a1e3de3ab143ed2d2c&query=";

// API endpoint for retrieving images
const apiEndpointImages = "https://image.tmdb.org/t/p/original";

// API endpoint for movie genres
const apiGenres = "https://api.themoviedb.org/3/genre/tv/list?api_key=b08ef18e709931a1e3de3ab143ed2d2c&language=en-US";

const fullStarCode = "<li><i class='fa fa-star'></i></li>";
const halfStarCode = "<li><i class='fa fa-star-half'></i></li>";

const urlParams = new URLSearchParams(window.location.search);
let trailerlink = urlParams.get('trailerlink');
let trailer = urlParams.get('trailer'); 
let js = urlParams.get('js');
let id = urlParams.get('id');

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

async function importdata() {
    return fetch('../json/idlink.json')
      .then(response => response.json())
      .then(jsonData => jsonData);
}

async function importtrailerdata() {
    return fetch('../json/idtrailerlink.json')
      .then(response => response.json())
      .then(jsonData => jsonData);
}

function openshow() {
    document.getElementById("video-overlay").style.display = "block";
}

function closeshow() {
    document.getElementById("video-overlay").style.display = "none";
}

function closetrailer() {
    document.getElementById("trailer-overlay").style.display = "none";
}

function watchtrailer() {
    document.getElementById("trailer-overlay").style.display = "block";
}

function bodystart() {
    if(js == "false")
        return;

    if(trailer == "false" || trailer == null)
        document.getElementById("trailer-overlay").style.display = "none";
    else
        document.getElementById("trailer-overlay").style.display = "block";

    let moviedetails = getmoviebyid(id);
    let cnfrmedagerating = getmovieagerating(id);

    moviedetails.then(function(data) {
        console.log(data );

        insertmovieplay.innerHTML = '<button class="btn btn-hover iq-button" onclick="openshow()"><i class="fa fa-play mr-3"></i>Play Now</button>';
        importdata().then(datafromidlink => {
            console.log(id);
            console.log(datafromidlink[id]);
            document.getElementById("video-overlay").innerHTML = '<iframe src="' + datafromidlink[id] + '" frameborder="0" allowfullscreen id="video-iframe" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe><span class="close-button" onclick="closeshow()">X</span>'
        });
        
        movierating.innerText = data.vote_average;
        cnfrmedagerating.then(function (_agerating) {
            agerating.innerText = _agerating;
        }).catch(function(error) {
            console.error(error);
        });
    }).catch(function(error) {
        console.error(error);
    });

    importtrailerdata().then(trailerlink => {
        document.getElementById("trailer-overlay").innerHTML = "<iframe src='" + trailerlink[id] + "'frameborder='0' allow='accelerometer; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><span class='close-button' onclick='closetrailer()'>X</span>";
    });
}

window.onload = function() {
    bodystart();
};
