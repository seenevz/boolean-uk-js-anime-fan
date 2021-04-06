// write your code here!
const API_URL = "https://api.jikan.moe/v3/top/anime/1";

let filterFormObj = {};
let sortValue = "";
let originalAnimes = null;

const getAnimeList = () => {
  fetch(API_URL)
    .then(resp => resp.json())
    .then(animes => {
      originalAnimes = animes.top;
      renderAnimes(animes.top);
    });
};

const renderAnimes = animesArr => {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  filterAndSortAnimes(animesArr).forEach(anime => {
    container.append(createAnimeCard(anime));
  });
};

const createAnimeCard = animeObj => {
  const card = document.createElement("a");
  card.href = animeObj.url;
  card.className = "card";
  card.target = "_blank";

  card.innerHTML = `
    <article >
      <div class="card__header">
        <h3>${animeObj.title}</h3>
      </div>
      <img
        src="${animeObj.image_url}"
        alt=""
        height="330"
      />
      <div class="card__info">
        <p>Episodes: ${animeObj.episodes}</p>
        <p>Start date: ${animeObj.start_date}</p>
        <p>End date: ${animeObj.end_date}</p>
        <p>Score: ${animeObj.score}</p>
        <p>Shortlisted by ${animeObj.members} people</p>
        <p>Made for ${animeObj.type}</p>
      </div>
    </article>
  `;

  return card;
};

const compareNumbers = (a, b) => b - a;

const compareWords = (a, b) => a.localeCompare(b);

const sortAnimes = (animesArr, sortType) => {
  const sortFuncs = {
    score: (a, b) => compareNumbers(a.score, b.score),
    type: (a, b) => compareWords(a.type, b.type),
    members: (a, b) => compareNumbers(a.members, b.members),
    title: (a, b) => compareWords(a.title, b.title),
  };

  return sortType !== "" ? animesArr.sort(sortFuncs[sortType]) : animesArr;
};

filterAnimes = (animesArr, filterType) => {
  console.log(filterType);
  return animesArr.filter(obj => {
    return Object.keys(filterType).reduce((acc, val) => {
      if (acc === false) return false;

      return val === "type"
        ? filterType[val] === ""
          ? true
          : obj[val] === filterType[val]
        : obj[val] > filterType[val];
    }, true);
  });
};

const filterAndSortAnimes = animesArr =>
  sortAnimes(filterAnimes(animesArr, filterFormObj), sortValue);

const addFilterFormListener = () => {
  const filterForm = document.querySelector(".filter-form");

  filterForm.addEventListener("change", ({ target }) => {
    filterFormObj = { ...filterFormObj, [target.name]: target.value };
    renderAnimes(originalAnimes);
  });
};

const addSortFormListener = () => {
  const sortForm = document.querySelector(".sort-form");

  sortForm.addEventListener("change", ({ target }) => {
    sortValue = target.value;
    renderAnimes(originalAnimes);
  });
};

const setupPage = () => {
  getAnimeList();
  addFilterFormListener();
  addSortFormListener();
};

window.addEventListener("DOMContentLoaded", setupPage);

/* 
Exercise:
  - Render all animes
  - Order by different properties
  - Filter by different properties
  - Search by different properties

Challenges:
  - Mark animes as favourite and display in separate top row
  - Add a personal score and update in all
*/
