export const initStandings = () => {
  const list = document.getElementById("standings-list");
  const sortBtns = document.querySelectorAll(".standings__btn-sort");

  // Сортировка
  sortBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.sort;
      const items = Array.from(list.querySelectorAll(".standings__item"));

      items.sort((a, b) => {
        return type === "points"
          ? b.dataset.points - a.dataset.points
          : a.dataset.team.localeCompare(b.dataset.team);
      });

      items.forEach((item) => list.appendChild(item));
    });
  });

  list.addEventListener("mouseover", (e) => {
    const item = e.target.closest(".standings__item");
    if (item) item.classList.add("is-active");
  });

  list.addEventListener("mouseout", (e) => {
    const item = e.target.closest(".standings__item");
    if (item) item.classList.remove("is-active");
  });
};
