import { putContents } from 'api/handlers';
import { RoomData } from 'types';
import createElement from 'utils/createElement';

export default function Editor({ contents, users }: RoomData): HTMLElement {
  const wrapper = createElement('div', 'editor-wrapper');
  const textArea = createElement('textarea');
  textArea.textContent = contents;

  putContents({ contents, users: users }, textArea.value);

  textArea.addEventListener('input', () => {
    putContents({ contents, users: users }, textArea.value);
  });

  wrapper.append(textArea);

  return wrapper;
}
