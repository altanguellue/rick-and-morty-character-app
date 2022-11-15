import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
const page = 1;
const searchQuery = "";
let pageIndex = 1;
let currentPage = `https://rickandmortyapi.com/api/character?page=${pageIndex}`;

async function fetchCharacters(moe) {
  try {
    const response = await fetch(moe);

    const data = await response.json();
    // console.log(data);

    if (response.ok) {
      cardContainer.innerHTML = "";
      const people = data.results;

      people.forEach((element) => {
        const name = element.name;
        const src = element.image;
        const status = element.status;
        const type = element.type;
        const occ = element.episode.length;

        createCharacterCard(src, name, status, type, occ);
      });

      // Success (Good Response)
      return data;
    } else {
      // Failure (Bad Response)
      console.error("Bad Response");
    }
  } catch (error) {
    // Failure (Network error, etc)
    console.error("An Error occurred");
  }
}

fetchCharacters(currentPage);
pagination.textContent = `${pageIndex}/${maxPage}`;

prevButton.addEventListener("click", () => {
  if (pageIndex < 2) {
    pageIndex;
  } else {
    pageIndex = pageIndex - 1;
  }
  let currentPage = `https://rickandmortyapi.com/api/character?page=${pageIndex}`;

  fetchCharacters(currentPage);
  pagination.textContent = `${pageIndex}/${maxPage}`;
});

nextButton.addEventListener("click", () => {
  if (pageIndex > 42) {
    pageIndex;
  } else {
    pageIndex = pageIndex + 1;
  }
  let currentPage = `https://rickandmortyapi.com/api/character?page=${pageIndex}`;

  fetchCharacters(currentPage);
  pagination.textContent = `${pageIndex}/${maxPage}`;
});
