import { Room, User, OtherUserCursor } from 'types';
import {
  getFromLocalStorage,
  getFromSessionStorage,
  setToLocalLocalStorage,
  setToSessionStorage,
} from './storage';

const ROOM_KEY = 'room';
const USER_KEY = 'user';
const CUSOR_KEY = 'cursor';

// 1.입장버튼 클릭 - 유저 생성
export function postUser(user: User) {
  setToSessionStorage(USER_KEY, user);
}
// 2.방 입장
// 2-1. 유저 없으면 EnterRoomPage 로
export function getUser() {
  return getFromSessionStorage<User>(USER_KEY);
}
// 2-2. 유저 있는데
// 유저 받아서
// (1) 방 없으면 만들고, 집어넣기
// (2) 방 있으면 집어넣기
// 방 리턴
// 유저 있는데 방이 없는 경우는, 원래 방은 폭파되는게 맞고
// 실제 플젝이라면 이렇게 직접 url로 방에 접근하는 경우는 없을테니까!
export function getRoom(user: User) {
  const prevRoom = getFromLocalStorage<Room>(ROOM_KEY);

  if (!prevRoom) {
    const newRoom = { contents: '', users: [user] };
    setToLocalLocalStorage(ROOM_KEY, newRoom);
    return newRoom;
  }

  const isSameUserInRoom = prevRoom.users.some(({ name }) => name === user.name);

  if (isSameUserInRoom) {
    return prevRoom;
  }

  const updatedRoom = { ...prevRoom, users: [...prevRoom.users, user] };
  setToLocalLocalStorage(ROOM_KEY, updatedRoom);

  return updatedRoom;
}
// 3. 에디터 업데이트
export function putContents(currnetRoom: Room, contents: string) {
  setToLocalLocalStorage(ROOM_KEY, { ...currnetRoom, contents });
}
// 4. 커서
export function postCursor(user: User, selectionEnd: number) {
  const cursors = getFromLocalStorage<OtherUserCursor[]>(CUSOR_KEY);

  if (!cursors) {
    setToLocalLocalStorage(CUSOR_KEY, [{ user, selectionEnd }]);
    return;
  }

  const index = cursors.findIndex(cursor => cursor.user.name === user.name);

  if (index === -1) {
    cursors.push({ user, selectionEnd });
  } else {
    cursors[index].selectionEnd = selectionEnd;
  }

  setToLocalLocalStorage(CUSOR_KEY, cursors);
}
