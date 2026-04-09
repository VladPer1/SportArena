import { initStandings } from "./components/standings.js";
import { initFeatures } from "./components/features.js";
import { initApiService } from "./components/apiService.js";

document.addEventListener("DOMContentLoaded", async () => {
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

  await initApiService();
});
