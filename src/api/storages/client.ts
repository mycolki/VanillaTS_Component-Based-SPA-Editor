export function getFromSessionStorage<T>(key: string): T | null {
  const storage = window.sessionStorage.getItem(key);

  if (!storage) {
    return null;
  }

  return JSON.parse(storage);
}

export function setToSessionStorage<T>(key: string, item: T) {
  window.sessionStorage.setItem(key, JSON.stringify(item));
}

export function clearSessionStorage() {
  window.sessionStorage.clear();
}
