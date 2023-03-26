import { Room, User } from 'types';
import STORAGE_KEY from 'api/storages/stroageKey';
import {
  clearSessionStorage,
  setToSessionStorage,
  getFromSessionStorage,
} from 'api/storages/client';
import {
  setToLocalLocalStorage,
  getFromLocalStorage,
  removeItemFromLocalStroage,
} from 'api/storages/server';

export function postUser(user: User) {
  const room = getFromLocalStorage<Room>(STORAGE_KEY.ROOM);

  if (room) {
    const isUserName = room.users.some(roomUser => roomUser.name === user.name);

    if (isUserName) {
      throw new Error('이미 존재하는 이름입니다. 다시 생각해 주세요');
    }

    const updatedRoom = { ...room, users: [...room.users, user] };
    setToLocalLocalStorage(STORAGE_KEY.ROOM, updatedRoom);
  } else {
    const newRoom = { contents: '', users: [user] };
    setToLocalLocalStorage(STORAGE_KEY.ROOM, newRoom);
  }

  setToSessionStorage(STORAGE_KEY.USER, user);
}

export function getUser() {
  return getFromSessionStorage<User>(STORAGE_KEY.USER);
}

export function deleteUser(user: User) {
  const room = getFromLocalStorage<Room>(STORAGE_KEY.ROOM);

  if (!room) {
    return;
  }

  const restUsers = room.users.filter(roomUser => roomUser.name !== user.name);

  if (!restUsers.length) {
    removeItemFromLocalStroage(STORAGE_KEY.ROOM);
  } else {
    setToLocalLocalStorage(STORAGE_KEY.ROOM, { ...room, users: restUsers });
  }

  clearSessionStorage();
}
