// apiService.js
import { setCache, getCache } from "../utils/helpers.js";

class FootballDataHandler {
  constructor() {
    // Реальное API со свободным доступом (видео и счета матчей)
    this.apiUrl = "https://www.scorebat.com/video-api/v3/";
    this.cacheKey = "football_real_data_v15";
  }

  async getMatchesData() {
    try {
      // Синхронизация: сначала смотрим кэш
      let cachedData = getCache(this.cacheKey);
      if (cachedData) {
        console.log("Данные синхронизированы из LocalStorage");
        return cachedData;
      }

      console.log("Выполнение реального fetch запроса к Scorebat API...");

      // Прямой запрос без прокси!
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const rawData = await response.json();

      // Scorebat отдает массив в поле response
      if (rawData.response) {
        const formattedData = this.formatMatchesData(rawData.response);

        // Сохраняем для синхронизации
        setCache(this.cacheKey, formattedData);
        this.sendNotification("Футбольные данные успешно обновлены!");

        return formattedData;
      }
      return [];
    } catch (error) {
      console.error(`Ошибка загрузки: ${error.message}`);
      return getCache(this.cacheKey) || [];
    }
  }

  formatMatchesData(rawData) {
    // Берем первые 5 матчей и форматируем под наш интерфейс
    return rawData.slice(0, 5).map((item) => ({
      title: item.title, // Например: "Arsenal - Liverpool"
      competition: item.competition,
      date: new Date(item.date).toLocaleDateString(),
      thumbnail: item.thumbnail,
    }));
  }

  renderMatches(matches, container) {
    if (!container) return;

    // Очищаем контейнер перед вставкой
    container.innerHTML = "";

    if (matches.length === 0) {
      container.insertAdjacentHTML(
        "beforeend",
        '<div class="api-loader">Матчи не найдены</div>',
      );
      return;
    }

    // Находим наш шаблон в HTML
    const template = document.getElementById("match-template");

    matches.forEach((m) => {
      // Клонируем содержимое шаблона
      const clone = template.content.cloneNode(true);

      // Наполняем клон данными через дата-атрибуты (чтобы не зависеть от классов)
      clone.querySelector("[data-title]").textContent = m.title;
      clone.querySelector("[data-competition]").textContent = m.competition;
      clone.querySelector("[data-date]").textContent = m.date;

      // Вставляем готовую карточку в контейнер
      container.appendChild(clone);
    });
  }

  sendNotification(text) {
    const alreadyShown = sessionStorage.getItem("notification_shown");

    if (Notification.permission === "granted" && !alreadyShown) {
      new Notification("SportArena", { body: text });

      // Помечаем, что в текущей сессии уведомление уже было
      sessionStorage.setItem("notification_shown", "true");
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
