// API endpoint for retrieving search results
const apiEndpoint = "https://api.themoviedb.org/3/search/movie?api_key=b08ef18e709931a1e3de3ab143ed2d2c&query=";

// API endpoint for retrieving images
const apiEndpointImages = "https://image.tmdb.org/t/p/original";

const fullStarCode = "<li><i class='fa fa-star'></i></li>";
const halfStarCode = "<li><i class='fa fa-star-half'></i></li>";

const movielikethisdefault = '<li class="slide-item"><div class="block-images position-relative"><div class="img-box"><img src="{moviebgimg}" class="img-fluid" alt="" /></div><div class="block-description"><h6 class="iq-title"><a href="../#"> {moviename} </a></h6><div class="movie-time d-flex align-items-center my-2"><div class="badge badge-secondary p-1 mr-2">{movieagerating}</div><span class="text-white">{movieduration}</span></div><div class="hover-buttons"><span class="btn btn-hover iq-button" onclick="gotomovie({movieid})"><i class="fa fa-play mr-1"></i>Play Now</span></div></div></div></li>';

const urlParams = new URLSearchParams(window.location.search);
let trailer = urlParams.get('trailer'); 
let js = urlParams.get('js');
let id = urlParams.get('id');

let collectionslider = document.getElementsByClassName('collection-slider')[0];
let movieoverview = document.getElementById('movieoverview');
let ratingstars = document.getElementById('ratingstars');
let movierating = document.getElementById('movierating');
let movietitle = document.getElementById('movietitle');
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

async function getmoviecollectiondata(collectionid) {
    return fetch("https://api.themoviedb.org/3/collection/" + collectionid + "?api_key=b08ef18e709931a1e3de3ab143ed2d2c&language=en-US")
        .then(response => response.json())
        .then(jsonData => jsonData);
}

function viewcollection() {
    getmoviebyid(id).then(data => {
        getmoviecollectiondata(data.belongs_to_collection.id).then(collectiondata => {
           window.location.href = '../collection/?id=' + collectiondata.id;
        });
    });
}

function repalcemovielikethisdefault(_moviebgimg, _moviename, _movieagerating, _movieduration, _movieid) {
    let e1 = movielikethisdefault.replace('{moviebgimg}', _moviebgimg);
    let e2 = e1.replace('{moviename}', _moviename);
    let e3 = e2.replace('{movieagerating}', _movieagerating);
    let e4 = e3.replace('{movieduration}', _movieduration);
    return e4.replace('{movieid}', _movieid);
}

function gotomovie(_id) {
    const newParamValue = _id;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set('id', newParamValue);
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    window.location.href = newUrl;
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
        console.log(data);

        document.getElementsByClassName("changethisbg")[0].style.backgroundImage = "url('" + apiEndpointImages + data.backdrop_path + "')";
        document.getElementsByClassName("changethisbg")[0].style.backgroundSize = "cover";

        movietitle.innerText = data.title;
        movieoverview.innerText = data.overview;

        insertmovieplay.innerHTML = '<button class="btn btn-hover iq-button" onclick="openshow()"><i class="fa fa-play mr-3"></i>Play Now</button>';
        importdata().then(datafromidlink => {
            document.getElementById("video-overlay").innerHTML = '<iframe src="' + datafromidlink[id] + '" frameborder="0" allowfullscreen id="video-iframe" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe><span class="close-button" onclick="closeshow()">X</span>'
        });
        
        let rating = data.vote_average;
        movierating.innerHTML = (Math.round(rating * 10) / 10 + "/10");
        for(let i = 0; i < rating; i+=2) {
            ratingstars.innerHTML += fullStarCode;
        }

        for(let i = 0; i < data.genres.length; i++) {
            genres.innerHTML += data.genres[i].name;
            if(i != data.genres.length - 1)
                genres.innerHTML += ", ";
        }

        cnfrmedagerating.then(function(_agerating) {
            agerating.innerText = _agerating;
        }).catch(function(error) {
            console.error(error);
        });

        getmoviecollectiondata(data.belongs_to_collection.id).then(function(collectiondata) {
            console.log(collectiondata);
            for(let i = 0; i < collectiondata.parts.length; i++) {
                if(collectiondata.parts[i].id == id)
                    continue;
                getmovieagerating(collectiondata.parts[i].id).then(function(thismovieagerating) {
                    fetch(`https://api.themoviedb.org/3/movie/${collectiondata.parts[i].id}?api_key=b08ef18e709931a1e3de3ab143ed2d2c`)
                    .then(response => response.json())
                    .then(data => {
                        const runtime = data.runtime;
                        const hours = Math.floor(runtime / 60);
                        const minutes = runtime % 60;
                        console.log(`${hours}h ${minutes}m`);
                        collectionslider.innerHTML += repalcemovielikethisdefault(apiEndpointImages + collectiondata.parts[i].backdrop_path, collectiondata.parts[i].title, thismovieagerating, (hours + 'h ' + minutes + 'min'), collectiondata.parts[i].id);
                    })
                    .catch(error => console.error(error));
                }).catch(function(error) {
                    console.error(error);
                });
            }
        }).catch(function(error) {
            console.error(error);
        });
    }).catch(function(error) {
        console.error(error);
    });

    importtrailerdata().then(trailerlink => {
        document.getElementById("trailer-overlay").innerHTML = "<iframe src='" + trailerlink[id] + "'frameborder='0' id='trailer-iframe' allow='accelerometer; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><span class='close-button' onclick='closetrailer()'>X</span>";
    });
}

window.onload = function() {
    bodystart();
};
