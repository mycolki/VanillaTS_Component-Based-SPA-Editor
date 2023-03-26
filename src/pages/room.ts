import { OtherUserCursor, User } from 'types';
import { getUser, getRoom, deleteUser, deleteCursor } from 'api/handlers';
import parse from 'utils/parse';
import createElement from 'utils/createElement';
import navigate from 'utils/navigate';
import Editor from 'components/Room/Editor';
import MemoizedUserList from 'components/Room/UserList';

export default function RoomPage(): HTMLElement {
  const container = createElement('div', { className: 'room-page__container' });
  const user = getUser();

  if (!user) {
    alert('닉네임 설정 페이지로 이동합니다. 😀');
    navigate('/enter-room');
    return container;
  }

  let room = getRoom(user);
  let roomUsers = room.users;
  let editor = Editor({ room, user });
  let userList = MemoizedUserList({ users: room.users, user });
  container.append(editor, userList);

  window.addEventListener('storage', e => {
    if (e.key !== 'cursor') {
      room = getRoom(user);
      renderUserList(room.users);
      renderEditor();
      return;
    }

    const otherUserCursor = parse<OtherUserCursor[]>(e.newValue);
    renderEditor(otherUserCursor);
  });

  window.addEventListener('beforeunload', () => {
    deleteUser(user);
    deleteCursor(user);
  });

  const renderEditor = (otherUserCursor: OtherUserCursor[] | null = null) => {
    const updatedEditor = Editor({ room, user, otherUserCursors: otherUserCursor });
    container.replaceChild(updatedEditor, editor);
    editor = updatedEditor;
  };

  const renderUserList = (updatedRoomUsers: User[]) => {
    const isSameUsers =
      roomUsers.length === updatedRoomUsers.length &&
      roomUsers.every((user, i) => user.name === updatedRoomUsers[i].name);
    const updatedUserList = MemoizedUserList({
      users: isSameUsers ? roomUsers : updatedRoomUsers,
      user,
    });

    container.replaceChild(updatedUserList, userList);
    userList = updatedUserList;

    if (!isSameUsers) {
      roomUsers = updatedRoomUsers;
    }
  };

  return container;
}
