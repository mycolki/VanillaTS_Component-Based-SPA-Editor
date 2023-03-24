import { getUser, getRoom } from 'api/handlers';
import { RoomData, User } from 'types';
import createElement from 'utils/createElement';
import Editor from 'components/Room/Editor';
import UserList from 'components/Room/UserList';
import navigate from 'utils/navigate';

export default function RoomPage(): HTMLElement {
  const container = createElement('div', 'room-page__container');
  const user = getUser();

  if (!user) {
    alert('닉네임 설정 페이지로 이동합니다. 😀');
    navigate('/enter-room');
    return container;
  }

  let roomData = getRoom(user);
  let editor = Editor(roomData);
  let userList = UserList({ users: roomData.users, user });
  container.append(editor, userList);

  window.addEventListener('storage', () => {
    const updatedRoomData = getRoom(user);
    if (updatedRoomData !== roomData) {
      render(updatedRoomData, user);
      roomData = updatedRoomData;
    }
  });

  function render(roomData: RoomData, user: User) {
    const updatedEditor = Editor(roomData);
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
