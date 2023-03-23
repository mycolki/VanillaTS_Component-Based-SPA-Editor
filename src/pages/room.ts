import createElement from 'utils/createElement';
import { getMyName, getRoom } from 'utils/handlers';
import naviagte from 'utils/navigate';

export default function RoomPage(): HTMLElement {
  const container = createElement('div', 'room-page__container');
  const editorWrapper = createElement('div', 'editor-wrapper');
  const editor = createElement('textarea');
  const sidebar = createElement('div', 'sidebar');
  const sidebarHeader = createElement('h1');
  const userList = createElement('ul');
  const message = createElement('p');

  sidebarHeader.textContent = '참여자 목록';

  sidebar.append(sidebarHeader, userList, message);
  editorWrapper.append(editor);
  container.append(editorWrapper, sidebar);

  const room = getContentsWithUsers();
  const myName = getMyName();

  if (room && myName) {
    editor.textContent = room.contents;
    updateUserList(userList, room.users, myName);
  }

  return container;
}

function getContentsWithUsers() {
  try {
    const room = getRoom();

    return room;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      naviagte('/');
    }
  }
}

function updateUserList(
  list: HTMLUListElement,
  users: string[],
  myName: string
) {
  const userNames = users.map((user) => {
    const li = createElement('li', user === myName ? myName : undefined);
    li.textContent = user;

    return li;
  });

  list.append(...userNames);
}
