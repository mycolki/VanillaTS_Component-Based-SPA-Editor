export function getFromSessionStorage<T>(key: string): T | null {
  const stored = window.sessionStorage.getItem(key);

  if (!stored) {
    return null;
  }

  return JSON.parse(stored);
}

export function setToSessionStorage(key: string, item: unknown) {
  window.sessionStorage.setItem(key, JSON.stringify(item));
}

export function getFromLocalStorage<T>(key: string): T | null {
  const stored = window.localStorage.getItem(key);

  if (!stored) {
    return null;
  }

  return JSON.parse(stored);
}

export function setToLocalLocalStorage(key: string, item: unknown) {
  window.localStorage.setItem(key, JSON.stringify(item));
}
