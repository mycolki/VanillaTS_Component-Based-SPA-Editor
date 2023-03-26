export default function isPropsEqual<T>(props: T | null, newProps: T): boolean {
  if (!props) {
    return false;
  }

  for (const key of Object.keys(props)) {
    const isNotEqual = !Object.is(props[key as keyof T], newProps[key as keyof T]);

    if (isNotEqual) {
      return false;
    }
  }

  return true;
}
