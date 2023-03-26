import { Room, User } from 'types';
import STORAGE_KEY from 'api/storages/stroageKey';
import { getFromLocalStorage, setToLocalLocalStorage } from 'api/storages/server';

export function getRoom(user: User) {
  const room = getFromLocalStorage<Room>(STORAGE_KEY.ROOM);

  if (!room) {
    const newRoom = { contents: '', users: [user] };
    setToLocalLocalStorage(STORAGE_KEY.ROOM, newRoom);
    return newRoom;
  }

  const isSameUserInRoom = room.users.some(({ name }) => name === user.name);

  if (isSameUserInRoom) {
    return room;
  }

  const updatedRoom = { ...room, users: [...room.users, user] };
  setToLocalLocalStorage(STORAGE_KEY.ROOM, updatedRoom);

  return updatedRoom;
}
