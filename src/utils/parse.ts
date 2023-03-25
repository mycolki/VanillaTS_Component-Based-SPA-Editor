export function parse<T>(data: string | null) {
  if (!data) {
    return null;
  }
  return JSON.parse(data) as T;
}
