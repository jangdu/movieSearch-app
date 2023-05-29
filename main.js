let movieData = {};

const getData = async (url, options) => {
  const response = await fetch(url, options);
  if (response.status == 200) {
    data = await response.json();
    movieData = await data.results;
    movieData.forEach((element) => {
      gridHtml(element);
    });
    return movieData;
  } else {
    throw new HttpError(response);
  }
};

const gridHtml = ({ id, backdrop_path, name, overview } = data) => {
  let element = document.querySelector(".movie-wrapper");
  let template = `
  <div class='movie-card' onclick="onClickMovieCard(${id})">
    <img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="">
    <h3>${name}</h3>
    <span>${overview}</span>
    <p>Rating: 8.7</p>
  </div>
  `;
  element.insertAdjacentHTML("beforeend", template);
};

const onClickMovieCard = (id) => {
  alert(`영화 id : ${id}`);
};

const onClickSearchBtn = async (event) => {
  event.preventDefault();
  let input = document.getElementById("search-input").value;
  let element = document.querySelector(".movie-wrapper");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  await movieData.map((data) => {
    data.name.includes(input) ? gridHtml(data) : "";
  });
};

window.onload = async () => {
  const url = "https://api.themoviedb.org/3/tv/top_rated?language=ko-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDg5NmYxODFiNjY0ZTNjNzFlMDA5NmExMTFhNTJmMiIsInN1YiI6IjY0NzA4ZGNiNTQzN2Y1MDE0NzVmMDc4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JriOHXrDYyiinhY94sBiFB5x5nHiGvzgXu8MVTUaWsQ",
    },
  };

  await getData(url, options);
};
