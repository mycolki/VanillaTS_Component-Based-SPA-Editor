type ElementOptions<K extends keyof HTMLElementTagNameMap> = Omit<
  Partial<HTMLElementTagNameMap[K]>,
  'style'
> & { style?: Partial<CSSStyleDeclaration> };

export default function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementOptions<K>,
  ...children: HTMLElement[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);

  if (options) {
    const { style, ...otherOptions } = options;
    Object.assign(element, otherOptions);

    if (style) {
      Object.assign(element.style, style);
    }
  }

  element.append(...children);

  return element;
}
