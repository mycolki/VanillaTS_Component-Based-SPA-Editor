import { putContents } from 'api/handlers';
import createElement from 'utils/createElement';
import debounce from 'utils/debounce';

interface Room {
  userNames: string[];
  contents: string;
}

export default function Editor({ contents, userNames }: Room): HTMLElement {
  const wrapper = createElement('div', 'editor-wrapper');
  const textArea = createElement('textarea');
  textArea.textContent = contents;

  const setContents = debounce(() => {
    putContents({ contents, userNames }, textArea.value);
  }, 1000);
  textArea.addEventListener('input', setContents);

  wrapper.append(textArea);

  return wrapper;
}
