// write your code here!
const API_URL = "https://api.jikan.moe/v3/top/anime/1";

const getAnimeList = () => {
  fetch(API_URL)
    .then((resp) => resp.json())
    .then((animes) => renderAnimes(animes.top));
};

const renderAnimes = (animesArr) => {
  const container = document.querySelector(".container");
  animesArr.forEach((anime) => {
    container.append(createAnimeCard(anime));
  });
};

const createAnimeCard = (animeObj) => {
  const card = document.createElement("a");
  card.href = animeObj.url;
  card.target = "_blank";

  card.innerHTML = `
    <article class="card">
      <h3>${animeObj.title}</h3>
      <img
        src="${animeObj.image_url}"
        alt=""
      />
      <div class="card__info">
        <p>Episodes: ${animeObj.episodes}</p>
        <p>Start date: ${animeObj.start_date}</p>
        <p>End date: ${animeObj.end_date}</p>
        <p>Score: ${animeObj.score}</p>
        <p>Short-listed by ${animeObj.members} people</p>
      </div>
    </article>
  `;

  return card;
};

getAnimeList();

/* 
Exercise:
  - Render all animes
  - Order by different properties
  - Filter by different properties
  - Search by different properties

Challenges:
  - Mark animes as favourite and display in separate row
  - Add a personal score and update in all
*/
