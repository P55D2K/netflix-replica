// API endpoint for retrieving search results
const apiEndpoint = "https://api.themoviedb.org/3/search/movie?api_key=b08ef18e709931a1e3de3ab143ed2d2c&query=";

// API endpoint for retrieving images
const apiEndpointImages = "https://image.tmdb.org/t/p/original";

const moviecard = '<div class="movie"><a href="{movielink}"><div><p>{movieyear}</p></div><div><img src="{movieposter}" alt="{movietitle}" /></div><div><span>{movietype}</span><h3>{movietitle}</h3></div></a></div>';

const urlParams = new URLSearchParams(window.location.search);
let trailer = urlParams.get('trailer');

function replacemoviecard(movielink, movieyear, movieposter, movietitle, movietype) {
    let editedmc = moviecard.replace('{movielink}', movielink);
    editedmc = editedmc.replace('{movieyear}', movieyear);
    editedmc = editedmc.replace('{movieposter}', movieposter);
    editedmc = editedmc.replace('{movietitle}', movietitle);
    editedmc = editedmc.replace('{movietitle}', movietitle);
    editedmc = editedmc.replace('{movietype}', movietype);
    return editedmc;
}