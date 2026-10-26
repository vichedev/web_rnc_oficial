// Evento para abrir las preferencias de cookies desde cualquier parte (ej. el footer)
export const OPEN_COOKIE_SETTINGS = "open-cookie-settings";

export const openCookieSettings = () =>
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
