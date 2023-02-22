// API endpoint for retrieving search results
const apiEndpoint = "https://api.themoviedb.org/3/search/movie?api_key=b08ef18e709931a1e3de3ab143ed2d2c&query=";

// API endpoint for retrieving images
const apiEndpointImages = "https://image.tmdb.org/t/p/original";

// API endpoint for movie genres
const apiGenres = "https://api.themoviedb.org/3/genre/tv/list?api_key=b08ef18e709931a1e3de3ab143ed2d2c&language=en-US";

const urlParams = new URLSearchParams(window.location.search);

let searched = urlParams.get('s');
let mainsearchbar = document.getElementById('mainsearchbar');

let moviecard = '<div class="movie"><a href="{movielink}"><div><p>{movieyear}</p></div><div><img src="{movieposter}" alt="{movietitle}" /></div><div><span>{movietype}</span><h3>{movietitle}</h3></div></a></div>'
let movies = []

function replacemoviecard(movielink, movieyear, movieposter, movietitle, movietype) {
    let editedmc = moviecard.replace('{movielink}', movielink);
    editedmc = editedmc.replace('{movieyear}', movieyear);
    editedmc = editedmc.replace('{movieposter}', movieposter);
    editedmc = editedmc.replace('{movietitle}', movietitle);
    editedmc = editedmc.replace('{movietitle}', movietitle);
    editedmc = editedmc.replace('{movietype}', movietype);
    return editedmc;
}

function searchload() {
    mainsearchbar.value = searched;
    searchfr();
}

function searchfr() {
    searched = mainsearchbar.value;
    fetch(apiEndpoint + searched)
        .then(response => response.json())
        .then(data => {
            movies = data.results;
            document.getElementById('results-header').innerText = 'Results for "' + searched + '"';

            if(movies.length == 0)
            {
                document.getElementById('results-movies').innerHTML = "<p style='margin-top:20px;font-size:2rem;color:#e50914;'>Sorry, no movies for " + searched + " found.</p>";
                return;
            }

            currentinner = "";
            for (let i = 0; i < movies.length; i++) {
                if(movies[i].adult == true)
                    continue
                if(movies[i].poster_path == "null" || movies[i].poster_path == null)
                    toadd = replacemoviecard("../watch/index.html?id=" + movies[i].id, movies[i].release_date.substring(0, 7), ("https://via.placeholder.com/300x445.png?text=Movie%20Poster%20Not%20Avaliable"), movies[i].title, (movies[i].vote_average.toFixed(1) + "/10"));
                else
                    toadd = replacemoviecard("../watch/index.html?id=" + movies[i].id, movies[i].release_date.substring(0, 7), (apiEndpointImages + movies[i].poster_path), movies[i].title, (movies[i].vote_average.toFixed(1) + "/10"));
                currentinner += toadd;
            }
            document.getElementById('results-movies').innerHTML = currentinner;
        })
        .catch(error => {
            console.error(error);
        });
}