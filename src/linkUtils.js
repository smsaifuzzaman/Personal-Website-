export const EXTERNAL_WINDOW_FEATURES = "noopener,noreferrer";
export const EXTERNAL_REL = "noopener noreferrer";

export function openExternal(url) {
  window.open(url, "_blank", EXTERNAL_WINDOW_FEATURES);
}
