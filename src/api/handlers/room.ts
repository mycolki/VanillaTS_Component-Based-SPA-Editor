import { Room } from 'types';
import STORAGE_KEY from 'api/storages/stroageKey';
import { getFromLocalStorage } from 'api/storages/server';

export function getRoom() {
  return getFromLocalStorage<Room>(STORAGE_KEY.ROOM);
}
