import { postContent, putContents } from 'api/handlers';
import { RoomData, User } from 'types';
import createElement from 'utils/createElement';

export default function Editor({
  roomData: { contents, users },
  user,
}: {
  roomData: RoomData;
  user: User;
}): HTMLElement {
  const wrapper = createElement('div', 'editor-wrapper');
  const textArea = createElement('textarea');
  const cursor = createElement('span', 'cursor');
  wrapper.append(cursor);
  textArea.textContent = contents;

  textArea.addEventListener('input', (e) => {
    const target = e.target as HTMLTextAreaElement;

    putContents({ contents, users }, textArea.value);
    postContent(user.name, target.selectionEnd);
  });

  wrapper.append(textArea);

  return wrapper;
}
