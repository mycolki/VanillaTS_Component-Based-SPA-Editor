import { getUser, getRoom } from 'api/handlers';
import { OtherUserCursor, RoomData, User } from 'types';
import parse from 'utils/parse';
import createElement from 'utils/createElement';
import navigate from 'utils/navigate';
import Editor from 'components/Room/Editor';
import UserList from 'components/Room/UserList';

export default function RoomPage(): HTMLElement {
  const container = createElement('div', { className: 'room-page__container' });
  const user = getUser();

  if (!user) {
    alert('닉네임 설정 페이지로 이동합니다. 😀');
    navigate('/enter-room');
    return container;
  }

  const roomData = getRoom(user);
  let editor = Editor({ roomData, user });
  let userList = UserList({ users: roomData.users, user });
  container.append(editor, userList);

  window.addEventListener('storage', e => {
    const updatedRoomData = getRoom(user);

    if (e.key === 'editing') {
      const otherUserCursor = parse<OtherUserCursor>(e.newValue);
      renderEditor(updatedRoomData, user, otherUserCursor);
      return;
    }

    renderUserList(updatedRoomData, user);
    renderEditor(updatedRoomData, user, null);
  });

  const renderEditor = (
    roomData: RoomData,
    user: User,
    otherUserCursor: OtherUserCursor | null
  ) => {
    const updatedEditor = Editor({ roomData, user, otherUserCursor });
    container.replaceChild(updatedEditor, editor);
    editor = updatedEditor;
  };

  const renderUserList = (roomData: RoomData, user: User) => {
    const updatedUserList = UserList({ users: roomData.users, user });
    container.replaceChild(updatedUserList, userList);
    userList = updatedUserList;
  };

  return container;
}
