import { getUser, getRoom } from 'api/handlers';
import { RoomData, User } from 'types';
import createElement from 'utils/createElement';
import navigate from 'utils/navigate';
import Editor from 'components/Room/Editor';
import UserList from 'components/Room/UserList';

export default function RoomPage(): HTMLElement {
  const container = createElement('div', 'room-page__container');
  const user = getUser();

  if (!user) {
    alert('닉네임 설정 페이지로 이동합니다. 😀');
    navigate('/enter-room');
    return container;
  }

  let roomData = getRoom(user);
  let editor = Editor({ roomData, user });
  let userList = UserList({ users: roomData.users, user });
  container.append(editor, userList);

  window.addEventListener('storage', (e) => {
    const updatedRoomData = getRoom(user);

    if (updatedRoomData !== roomData) {
      render(updatedRoomData, user);
      roomData = updatedRoomData;
    }

    if (e.key === 'editing') {
      const data = parse<{ userName: string; selectionEnd: number }>(
        e.newValue
      );
      if (data) {
        const { userName, selectionEnd } = data;
        const textArea = document.querySelector('textarea');
        const cursor = document.querySelector<HTMLSpanElement>('.cursor');

        if (textArea && cursor) {
          cursor.textContent = userName;
          const lineHeight = parseInt(
            getComputedStyle(textArea).lineHeight,
            10
          );
          const lines = textArea.value.slice(0, selectionEnd).split('\n');
          const currentLine = lines.length;
          const prevLines = lines.slice(0, currentLine - 1);
          const prevLinesLength = prevLines.reduce(
            (length, line) => length + line.length + 1,
            0
          );

          cursor.style.left = `${(selectionEnd - prevLinesLength) * 10}px`;
          cursor.style.top = `${
            (currentLine - 1) * lineHeight - textArea.scrollTop
          }px`;
        }
      }
    }
  });

  // roomData 로 editor 랑 userList 둘다 렌더링, 커서이벤트는 어떻게 전달해야하지.
  // 그리고 방 입장하는 거 고장남. ㅠㅠ
  function render(roomData: RoomData, user: User) {
    const updatedEditor = Editor({ roomData, user });
    const updatedUserList = UserList({
      users: roomData.users,
      user,
    });

    container.replaceChild(updatedEditor, editor);
    container.replaceChild(updatedUserList, userList);
    editor = updatedEditor;
    userList = updatedUserList;
  }

  return container;
}

function parse<T>(data: string | null) {
  if (!data) {
    return null;
  }
  return JSON.parse(data) as T;
}
