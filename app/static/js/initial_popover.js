function initialize_popovers() {
  // Находим только неинициализированные элементы
  const popups = document.querySelectorAll(
    ".user_popup:not([data-bs-popover-initialized])"
  );

  for (let element of popups) {
    // Помечаем как инициализированный
    element.setAttribute("data-bs-popover-initialized", "true");

    const popover = new bootstrap.Popover(element, {
      content: "Loading...",
      trigger: "hover focus",
      placement: "right",
      html: true,
      sanitize: false,
      delay: { show: 500, hide: 0 },
      container: "body",
      customClass: "d-inline",
    });

    // Обработчик показа
    element.addEventListener("show.bs.popover", async function (ev) {
      const target = ev.target;

      // Если уже загружено, не загружаем снова
      if (target.popupLoaded) return;

      try {
        const username = target.dataset.username || target.innerText.trim();
        const response = await fetch(`/user/${username}/popup`);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.text();
        const popoverInstance = bootstrap.Popover.getInstance(target);

        if (popoverInstance && data) {
          target.popupLoaded = true;
          popoverInstance.setContent({ ".popover-body": data });
          // Если используется flask-moment
          if (typeof flask_moment_render_all === "function") {
            flask_moment_render_all();
          }
        }
      } catch (error) {
        console.error("Popover loading error:", error);
        const popoverInstance = bootstrap.Popover.getInstance(target);
        if (popoverInstance) {
          popoverInstance.setContent({
            ".popover-body": "Error loading user data",
          });
        }
      }
    });
  }
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", initialize_popovers);

// Экспорт для повторной инициализации
if (typeof window !== "undefined") {
  window.initialize_popovers = initialize_popovers;
}
