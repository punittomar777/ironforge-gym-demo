export const themeStorageKey = "ironforge-theme";

// Runs synchronously in <head>, before content paints. Storage is optional.
export const themeInitScript = `(function(){var t;try{t=localStorage.getItem("${themeStorageKey}")}catch(e){}document.documentElement.dataset.theme=t==="light"||t==="dark"?t:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"})()`;
