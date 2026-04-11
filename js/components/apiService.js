// apiService.js
import { setLocalCache, getLocalCache } from "../utils/localStorage.js";
import { setSessionFlag, getSessionFlag } from "../utils/sessionStorage.js";

class FootballDataHandler {
  constructor() {
    this.apiUrl = "https://www.scorebat.com/video-api/v3/";
    this.cacheKey = "football_real_data_v15";
  }

  async getMatchesData() {
    try {
      let cachedData = getLocalCache(this.cacheKey);
      if (cachedData) {
        console.log("Данные синхронизированы из LocalStorage");
        return cachedData;
      }

      console.log("Выполнение реального fetch запроса к Scorebat API...");

      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const rawData = await response.json();

      if (rawData.response) {
        const formattedData = this.formatMatchesData(rawData.response);

        setLocalCache(this.cacheKey, formattedData);
        this.sendNotification("Футбольные данные успешно обновлены!");

        return formattedData;
      }
      return [];
    } catch (error) {
      console.error(`Ошибка загрузки: ${error.message}`);
      return getLocalCache(this.cacheKey) || [];
    }
  }

  formatMatchesData(rawData) {
    return rawData.slice(0, 5).map((item) => ({
      title: item.title,
      competition: item.competition,
      date: new Date(item.date).toLocaleDateString(),
      thumbnail: item.thumbnail,
    }));
  }

  renderMatches(matches, container) {
    if (!container) return;

    container.innerHTML = "";

    if (matches.length === 0) {
      container.insertAdjacentHTML(
        "beforeend",
        '<div class="api-loader">Матчи не найдены</div>',
      );
      return;
    }

    const template = document.getElementById("match-template");

    matches.forEach((m) => {
      const clone = template.content.cloneNode(true);

      clone.querySelector("[data-title]").textContent = m.title;
      clone.querySelector("[data-competition]").textContent = m.competition;
      clone.querySelector("[data-date]").textContent = m.date;

      container.appendChild(clone);
    });
  }

  sendNotification(text) {
    const alreadyShown = getSessionFlag("notification_shown");

    if (Notification.permission === "granted" && !alreadyShown) {
      new Notification("SportArena", { body: text });

      setSessionFlag("notification_shown", "true");
      console.log(
        "Уведомление сохранено в SessionStorage (только для этой вкладки)",
      );
    }
  }
}

export const initApiService = async () => {
  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }

  const container = document.getElementById("api-matches-container");
  const handler = new FootballDataHandler();

  if (container) container.innerHTML = "<p>Загрузка реальных данных...</p>";

  const data = await handler.getMatchesData();
  handler.renderMatches(data, container);
};
