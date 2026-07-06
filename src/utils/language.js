const STORAGE_KEY = "uarda-dauti-lashes:language";
const DEFAULT_LANGUAGE = "al";
const SUPPORTED_LANGUAGES = ["al", "en"];

let memoryLanguage = DEFAULT_LANGUAGE;

export function getLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LANGUAGES.includes(stored)) {
      return stored;
    }
  } catch (error) {
    // localStorage unavailable (private mode, disabled storage, etc.)
  }
  return memoryLanguage;
}

export function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    throw new Error(`Unsupported language: ${language}`);
  }
  memoryLanguage = language;
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    // localStorage unavailable; in-memory value keeps the page working
  }
}

export function toggleLanguage() {
  const next = getLanguage() === "al" ? "en" : "al";
  setLanguage(next);
  return next;
}
