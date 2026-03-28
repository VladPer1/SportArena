import { initStandings } from "./components/standings.js";
import { initFeatures } from "./components/features.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("SportArena scripts initialized");
  initStandings();
  initFeatures();
});
