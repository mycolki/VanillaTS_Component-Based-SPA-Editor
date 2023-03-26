import { OtherUserCursor, Room, User } from 'types';
import { postContent, putContents } from 'api/handlers';
import createElement from 'utils/createElement';

interface Props {
  room: Room;
  user: User;
  otherUserCursor?: OtherUserCursor | null;
}

export default function Editor({
  room: { contents, users },
  user,
  otherUserCursor,
}: Props): HTMLElement {
  const textarea = createElement('textarea', { className: '11', textContent: contents });
  const cursor = createElement('span', { className: 'cursor', style: { display: 'none' } });
  const wrapper = createElement('div', { className: 'editor-wrapper' }, textarea, cursor);

  if (otherUserCursor) {
    showOtherUserCursor(cursor, otherUserCursor);
  }

  textarea.addEventListener('input', e => {
    const target = e.target as HTMLTextAreaElement;
    putContents({ contents, users }, textarea.value);
    postContent(user, target.selectionEnd);
  });

  return wrapper;
}

const showOtherUserCursor = (cursor: HTMLSpanElement, otherUserCursor: OtherUserCursor) => {
  const { user: otherUser, selectionEnd } = otherUserCursor;
  const textarea = document.querySelector('textarea');
  cursor.textContent = otherUser.name;

  if (textarea) {
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
    const lines = textarea.value.slice(0, selectionEnd).split('\n');
    const currentLine = lines.length;
    const prevLines = lines.slice(0, currentLine - 1);
    const prevLinesLength = prevLines.reduce((length, line) => length + line.length + 1, 0);

    cursor.style.left = `${(selectionEnd - prevLinesLength) * 10}px`;
    cursor.style.top = `${(currentLine - 1) * lineHeight - textarea.scrollTop}px`;
    cursor.style.display = 'block';
  }
};
