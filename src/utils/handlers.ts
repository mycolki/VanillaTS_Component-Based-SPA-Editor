import {
  getFromLocalStorage,
  getFromSessionStorage,
  setToLocalLocalStorage,
  setToSessionStorage,
} from './storage';

interface Room {
  users: string[];
  contents: string;
}
// 1.입장버튼 누를때
// - 방장: 방 없으면 새로 만들기 + 세션에 이름 저장
// - 추가 입장: 방 있으면 names 업데이트 + 세션에 이름 저장
// room: {contents: '', users: [name, name]}

export function postName(name: string) {
  setToSessionStorage('name', name);
}

export function postRoom(name: string) {
  const room = getFromLocalStorage<Room>('room');

  if (!room) {
    setToLocalLocalStorage('room', {
      users: [name],
      contents: '',
    });
    return;
  }

  setToLocalLocalStorage('room', {
    ...room,
    users: [...room.users, name],
  });
}

// 2. 방에 입장하면,,
// 세션에 자기 네임으로 저장된 게 있으면 리턴, getMyName
// contents 랑, 유저목록 리턴

export function getMyName() {
  return getFromSessionStorage<string>('name');
}

export function getRoom() {
  const room = getFromLocalStorage<Room>('room');

  if (!room) {
    throw new Error('방이 존재하지 않습니다. 방만들기 페이지로 이동합니다.');
  }

  return room;
}
