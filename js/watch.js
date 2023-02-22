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
let id = urlParams.get('id');

let watchplaybutton = document.getElementById('watch-play-btn');
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

function openshow(ismovie) {
    document.getElementById("video-overlay").style.display = "block";
    if(ismovie) {
        importdata().then(datafromidlink => {
            document.getElementById("video-overlay").innerHTML = '<iframe src="' + datafromidlink[id] + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><span class="close-button" onclick="closeshow()">X</span>';
        });
    } else {
        document.getElementById("video-overlay").innerHTML = '<iframe src="' + trailerlink + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><span class="close-button" onclick="closeshow()">X</span>';
    }
}

function closeshow() {
    document.getElementById("video-overlay").style.display = "none";
    console.log(datafromidlink);
    alert("hi");
    importdata().then(datafromidlink => {
        document.getElementById("video-overlay").innerHTML = '<iframe src="' + datafromidlink[id] + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><span class="close-button" onclick="closeshow()">X</span>';
    });
}

function bodystart() {
    let moviedetails = getmoviebyid(id);
    let cnfrmedagerating = getmovieagerating(id);

    moviedetails.then(function(data) {
        importdata().then(datafromidlink => {
            if(trailerlink != null)
                insertmovieplay.innerHTML = '<button class="btn btn-hover iq-button" onclick="openshow(false)"><i class="fa fa-play mr-3"></i>Play Now</button>';
            if(trailerlink == null)
                insertmovieplay.innerHTML = '<button class="btn btn-hover iq-button" onclick="openshow(true)"><i class="fa fa-play mr-3"></i>Play Now</button>';
        });

        cnfrmedagerating.then(function (_agerating) {
            agerating.innerText = _agerating;
        }).catch(function(error) {
            console.error(error);
        });

    }).catch(function(error) {
        console.error(error);
    });
}

window.onload = function() {
    bodystart();
};
