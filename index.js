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
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    // console.log(data.results);

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

        // cardContainer.append();
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

fetchCharacters();
// cardContainer.innerHTML = "";
// createCharacterCard();
// createCharacterCard();
