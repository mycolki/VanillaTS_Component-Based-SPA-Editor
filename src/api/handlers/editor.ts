import { OtherUserCursor, Room, User } from 'types';
import STORAGE_KEY from 'api/storages/stroageKey';
import {
  getFromLocalStorage,
  removeItemFromLocalStroage,
  setToLocalLocalStorage,
} from 'api/storages/server';

export function putContents(currnetRoom: Room, contents: string) {
  setToLocalLocalStorage(STORAGE_KEY.ROOM, { ...currnetRoom, contents });
}

export function postCursor(user: User, selectionEnd: number) {
  const cursors = getFromLocalStorage<OtherUserCursor[]>(STORAGE_KEY.CUSOR);

  if (!cursors) {
    setToLocalLocalStorage(STORAGE_KEY.CUSOR, [{ user, selectionEnd }]);
    return;
  }

  const index = cursors.findIndex(cursor => cursor.user.name === user.name);

  if (index === -1) {
    cursors.push({ user, selectionEnd });
  } else {
    cursors[index].selectionEnd = selectionEnd;
  }

  setToLocalLocalStorage(STORAGE_KEY.CUSOR, cursors);
}

export function deleteCursor(user: User) {
  const cursors = getFromLocalStorage<OtherUserCursor[]>(STORAGE_KEY.CUSOR);

  if (!cursors) {
    return;
  }

  const restCursors = cursors.filter(cursor => cursor.user.name !== user.name);

  if (!restCursors.length) {
    removeItemFromLocalStroage(STORAGE_KEY.CUSOR);
    return;
  }

  setToLocalLocalStorage(STORAGE_KEY.CUSOR, restCursors);
}
