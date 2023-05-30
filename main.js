let movieData = [];
let currentPage = 1;
let searching = false;
let _scrollchk = false;

const getData = async (currentPage) => {
  const url = `https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&include_video=true&page=${currentPage}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDg5NmYxODFiNjY0ZTNjNzFlMDA5NmExMTFhNTJmMiIsInN1YiI6IjY0NzA4ZGNiNTQzN2Y1MDE0NzVmMDc4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JriOHXrDYyiinhY94sBiFB5x5nHiGvzgXu8MVTUaWsQ",
    },
  };

  const response = await fetch(url, options);
  if (response.status == 200) {
    _scrollchk = true;
    data = await response.json();
    const temp = await data.results;
    console.log(temp);
    await temp.forEach((element) => {
      movieData.push(element);
      gridHtml(element);
    });
    _scrollchk = false;
    return movieData;
  } else {
    throw new HttpError(response);
  }
};

const gridHtml = ({ id, poster_path, name, vote_average, overview } = data) => {
  let element = document.querySelector(".movie-wrapper");
  let template = `
  <div class='movie-card' onclick="onClickMovieCard(${id})">
    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="">
    <div class='card-dedail-wrap'>
      <h3>${name}</h3>
      <span class='scroll'>${overview}</span>
      <p>Rating: ${vote_average}</p>
    </div>
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
  searching = input ? true : false;
  let element = document.querySelector(".movie-wrapper");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  await movieData.map((data) => {
    data.name.includes(input) ? gridHtml(data) : "";
  });
};

const io = new IntersectionObserver(async (entries, observer) => {
  await entries.forEach(async (entry) => {
    if (!entry.isIntersecting || _scrollchk || searching) return;
    observer.observe(document.getElementById("loading-ui"));
    currentPage += 1;
    await getData(currentPage);
  });
});

window.onload = async () => {
  currentPage = 1;

  await getData(currentPage);

  await io.observe(document.getElementById("loading-ui"));
};
