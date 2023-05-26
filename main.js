let movieData = {};

// gridhtml function
const gridHtml = (data) => {
  let element = document.querySelector(".movie-wrapper");
  let template = `
  <div class='movie-card'>
    <img src="https://image.tmdb.org/t/p/w500/${data.backdrop_path}" alt="The Godfather">
    <h3>${data.name}</h3>
    <p>${data.overview}</p>
    <p>Rating: 8.7</p>
  </div>
  `;
  element.insertAdjacentHTML("beforeend", template);
};

const handleSearch = async (event) => {
  event.preventDefault();
  let input = document.getElementById("search-input").value;
  let element = document.querySelector(".movie-wrapper");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  await movieData.map((data) => {
    if (data.name.includes(input)) {
      gridHtml(data);
    }
  });
  console.log();
};

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
      movieData = json.results;
      movieData.forEach((element) => {
        gridHtml(element);
      });
    })
    .catch((err) => console.error("error:" + err));
};
