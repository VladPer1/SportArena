import { initStandings } from "./components/standings.js";
import { initFeatures } from "./components/features.js";

document.addEventListener("DOMContentLoaded", () => {
  const allCards = document.querySelectorAll(".news-card");
  const mainHeader = document.querySelector(".header");
  const standingsList = document.getElementById("standings-list");

  console.log("SportArena Debug Info:", {
    cardsCount: allCards.length,
    header: mainHeader,
    container: standingsList,
  });
  console.log("SportArena scripts initialized");
  initStandings();
  initFeatures();
});
