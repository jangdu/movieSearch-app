// gridhtml function
const gridHtml = (data) => {
  let element = document.querySelector(".movie-wrapper");

  let template = `
  <div class='movie-card'>
    <img src="https://image.tmdb.org/t/p/w500${data.backdrop_path}" alt="The Godfather">
    <h3>${data.name}</h3>
    <p>Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.</p>
    <p>Rating: 8.7</p>
  </div>
  
  `;
  element.insertAdjacentHTML("beforeend", template);
};

// const searchMovie = (title) => {
//   default
// };

window.onload = () => {
  const url = "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDg5NmYxODFiNjY0ZTNjNzFlMDA5NmExMTFhNTJmMiIsInN1YiI6IjY0NzA4ZGNiNTQzN2Y1MDE0NzVmMDc4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JriOHXrDYyiinhY94sBiFB5x5nHiGvzgXu8MVTUaWsQ",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      json.results.forEach((element) => {
        gridHtml(element);
      });
    })
    .catch((err) => console.error("error:" + err));


  element.addEventListener(type, listener){}
};
