// API endpoint for retrieving search results
const apiEndpoint = "https://api.themoviedb.org/3/search/movie?api_key=b08ef18e709931a1e3de3ab143ed2d2c&query=";

// API endpoint for retrieving images
const apiEndpointImages = "https://image.tmdb.org/t/p/original";

const moviecard = '<div class="movie"><a href="{movielink}"><div><p>{movieyear}</p></div><div><img src="{movieposter}" alt="{movietitle}" /></div><div><span>{movierating}</span><h3>{movietitle}</h3></div></a></div>';

const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');

let moviecollectionheader = document.getElementById('moviecollectionheader');
let collectionmovies = document.getElementById('collectionmovies');

function replacemoviecard(movielink, movieyear, movieposter, movietitle, movierating) {
    let editedmc = moviecard.replace('{movielink}', movielink);
    editedmc = editedmc.replace('{movieyear}', movieyear);
    editedmc = editedmc.replace('{movieposter}', movieposter);
    editedmc = editedmc.replace('{movietitle}', movietitle);
    editedmc = editedmc.replace('{movietitle}', movietitle);
    editedmc = editedmc.replace('{movierating}', movierating);
    return editedmc;
}

async function getmoviebyid(_id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${_id}?api_key=b08ef18e709931a1e3de3ab143ed2d2c&language=en-US&append_to_response=release_dates`);
    const data = await response.json();
    return data;
}

async function getmoviecollectiondata(collectionid) {
    return fetch("https://api.themoviedb.org/3/collection/" + collectionid + "?api_key=b08ef18e709931a1e3de3ab143ed2d2c&language=en-US")
        .then(response => response.json())
        .then(jsonData => jsonData);
}

function bodystart() {
    getmoviecollectiondata(id).then(collectiondata => {
        console.log(collectiondata);
        let moviecards = '';
        collectiondata.parts.forEach(movie => {
            let movielink = '../watch/?id=' + movie.id;
            let movieyear = movie.release_date.substring(0, 4);
            let movieposter = apiEndpointImages + movie.poster_path;
            let movietitle = movie.title;
            getmoviebyid(movie.id).then(moviedata => {
                let movierating = moviedata.vote_average.toFixed(1) + "/10";
                moviecards += replacemoviecard(movielink, movieyear, movieposter, movietitle, movierating);
                collectionmovies.innerHTML = moviecards;
            });
        });
        moviecollectionheader.innerHTML = collectiondata.name;
    });
}