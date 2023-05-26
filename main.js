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
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
