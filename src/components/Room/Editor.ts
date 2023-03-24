import { putContents } from 'api/handlers';
import { RoomData } from 'types';
import createElement from 'utils/createElement';
import debounce from 'utils/debounce';

export default function Editor({ contents, users }: RoomData): HTMLElement {
  const wrapper = createElement('div', 'editor-wrapper');
  const textArea = createElement('textarea');
  textArea.textContent = contents;

  const setContents = debounce(() => {
    putContents({ contents, users: users }, textArea.value);
  }, 1000);

  textArea.addEventListener('input', setContents);

  wrapper.append(textArea);

  return wrapper;
}
