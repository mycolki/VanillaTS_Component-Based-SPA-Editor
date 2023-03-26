import { OtherUserCursor, Room, User } from 'types';
import { postCursor, putContents } from 'api/handlers/editor';
import createElement from 'utils/createElement';

interface Props {
  room: Room;
  user: User;
  otherUserCursors?: OtherUserCursor[] | null;
}

export default function Editor({
  room: { contents, users },
  user,
  otherUserCursors,
}: Props): HTMLElement {
  const textarea = createElement('textarea', { className: '11', textContent: contents });
  const wrapper = createElement('div', { className: 'editor-wrapper' }, textarea);

  textarea.addEventListener('input', e => {
    const target = e.target as HTMLTextAreaElement;
    putContents({ contents, users }, textarea.value);
    postCursor(user, target.selectionEnd);
  });

  if (otherUserCursors) {
    wrapper.append(...getOtherUserCursors(user, otherUserCursors));
  }

  return wrapper;
}

const getOtherUserCursors = (user: User, otherUserCursors: OtherUserCursor[]) => {
  const textarea = document.querySelector('textarea');
  const cursors: HTMLSpanElement[] = [];

  if (!textarea) {
    return cursors;
  }

  for (const { user: otherUser, selectionEnd } of otherUserCursors) {
    if (otherUser.name === user.name) {
      continue;
    }

    const cursor = createElement('span', { className: 'cursor', textContent: otherUser.name });
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
    const lines = textarea.value.slice(0, selectionEnd).split('\n');
    const currentLine = lines.length;
    const prevLines = lines.slice(0, currentLine - 1);
    const prevLinesLength = prevLines.reduce((length, line) => length + line.length + 1, 0);

    cursor.style.left = `${(selectionEnd - prevLinesLength) * 10}px`;
    cursor.style.top = `${(currentLine - 1) * lineHeight - textarea.scrollTop}px`;
    cursors.push(cursor);
  }

  return cursors;
};
