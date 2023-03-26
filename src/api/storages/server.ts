export function getFromLocalStorage<T>(key: string): T | null {
  const storage = window.localStorage.getItem(key);

  if (!storage) {
    return null;
  }

  return JSON.parse(storage);
}

export function setToLocalLocalStorage<T>(key: string, item: T) {
  window.localStorage.setItem(key, JSON.stringify(item));
}

export function removeItemFromLocalStroage(key: string) {
  window.localStorage.removeItem(key);
}
