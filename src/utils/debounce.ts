export default function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;

  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
