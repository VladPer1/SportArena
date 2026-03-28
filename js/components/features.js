import { getRandomInt, formatVoteMessage } from "../utils/helpers.js";

export const initFeatures = () => {
  // Живой счетчик
  const countEl = document.getElementById("match-count");
  if (countEl) {
    setInterval(() => {
      countEl.style.opacity = "0";
      setTimeout(() => {
        countEl.textContent = getRandomInt(1, 5);
        countEl.style.opacity = "1";
      }, 200);
    }, 10000);
  }

  // Голосование
  const voteBtns = document.querySelectorAll(".voting__btn");
  const msgEl = document.getElementById("vote-message");

  voteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      voteBtns.forEach((b) => {
        b.classList.remove("voting__btn--selected");
        b.disabled = true;
      });
      this.classList.add("voting__btn--selected");
      msgEl.textContent = formatVoteMessage(this.textContent);
    });
  });
};
