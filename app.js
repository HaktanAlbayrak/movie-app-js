const movieNameRef = document.getElementById('movie-name');
const searchBtn = document.getElementById('search-btn');
const result = document.getElementById('result');
const loader = document.getElementById('loader');

// Function to fetch movie data from API

const getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // if input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
  }

  //if input field isn't empty
  else {
    loader.style.display = 'block';
    result.style.display = 'none';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // if movie exist in db
        loader.style.display = 'none';
        result.style.display = 'block';
        if (data.Response == 'True') {
          result.innerHTML = `
            <div class="info">
               <img src=${data.Poster} class="poster">
               <div>
                  <h2>${data.Title}</h2>
                  <div class="rating">
                     <img src="star-icon.svg">
                     <h4>${data.imdbRating}</h4>
                  </div>
                  <div class="details">
                     <span>${data.Rated}</span>
                     <span>${data.Year}</span>
                     <span>${data.Runtime}</span>
                  </div>
                  <div class="genre">
                     <div>${data.Genre.split(',').join('</div><div>')}</div>
                  </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
         `;
        }

        // if movie doesn't exist in db
        else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      // if error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Something went wrong</h3>`;
      });
  }
};

searchBtn.addEventListener('click', getMovie);
window.addEventListener('load', getMovie);
