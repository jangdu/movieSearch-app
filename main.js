// 전역 변수선언
// api데이터를 넣어두는 변수
let movieData = [];
// 현재 페이지 변수
let currentPage = 1;
// 검색을 눌렀을 때 참거짓
let searching = false;
// 무한스크롤 로딩중 참거짓
let _scrollchk = false;

// fetch GET요청 보내는 함수, 인자는 가져올 페이지
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
    // 로딩중 true로 변경
    _scrollchk = true;
    data = await response.json();
    const temp = await data.results;
    // 받아온 json데이터를 movieData에 넣고, gridHtml함수 실행
    await temp.forEach((element) => {
      movieData.push(element);
      gridHtml(element);
    });
    // 로딩중 false
    _scrollchk = false;
    return movieData;
  } else {
    throw new HttpError(response);
  }
};

// 인자로 받은 데이터를 이용해서 카드를 만들어 .movie-wrapper안에 넣어주는 함수
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

// movieCard클릭시 발생하는 이벤트 함수
const onClickMovieCard = (id) => {
  alert(`영화 id : ${id}`);
};

// searchForm submit시 발생하는 이벤트 함수
const onClickSearchBtn = async (event) => {
  event.preventDefault();
  // input받은 데이터
  let input = document.getElementById("search-input").value;
  // 검색중일 때는 무한스크롤 감지에서 제외하는 변수
  searching = input ? true : false;
  let element = document.querySelector(".movie-wrapper");
  // 현제 페이지에서 카드들 삭제
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  // 검색된 데이터만 gridHtml
  await movieData.map((data) => {
    data.name.includes(input) ? gridHtml(data) : "";
  });
};

// 무한스크롤 감시 함수: 맨 밑 도달시 currentPage + 1, getData()실행
const io = new IntersectionObserver(async (entries, observer) => {
  await entries.forEach(async (entry) => {
    // 감시 시 제외할 상황들
    if (!entry.isIntersecting || _scrollchk || searching) return;
    observer.observe(document.getElementById("loading-ui"));
    currentPage += 1;
    await getData(currentPage);
  });
});

// 앱 시작시 실행하는 부분
window.onload = async () => {
  // 현재 페이지 초기화
  currentPage = 1;

  // fatch GET하는 함수 실행
  await getData(currentPage);

  // 무한스크롤 감시함수 실행
  await io.observe(document.getElementById("loading-ui"));
};
