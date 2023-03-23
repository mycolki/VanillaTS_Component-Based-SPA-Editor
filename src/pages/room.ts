import createElement from 'utils/createElement';

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

  return container;
}
