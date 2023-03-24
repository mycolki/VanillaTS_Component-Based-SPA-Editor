import { RoomData, User } from 'types';
import {
  getFromLocalStorage,
  getFromSessionStorage,
  setToLocalLocalStorage,
  setToSessionStorage,
} from './storage';

const ROOM_KEY = 'room';
const USER_KEY = 'user';

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
  const prevRoomData = getFromLocalStorage<RoomData>(ROOM_KEY);

  if (!prevRoomData) {
    const newRoomData = { contents: '', users: [user] };
    setToLocalLocalStorage(ROOM_KEY, newRoomData);
    return newRoomData;
  }

  const isSameUserInRoom = prevRoomData.users.some(
    ({ name }) => name === user.name
  );

  if (isSameUserInRoom) {
    return prevRoomData;
  }

  const updatedRoomData = {
    ...prevRoomData,
    users: [...prevRoomData.users, user],
  };
  setToLocalLocalStorage(ROOM_KEY, updatedRoomData);

  return updatedRoomData;
}
// 3. 에디터 업데이트
export function putContents(currnetRoom: RoomData, contents: string) {
  setToLocalLocalStorage(ROOM_KEY, { ...currnetRoom, contents });
}
