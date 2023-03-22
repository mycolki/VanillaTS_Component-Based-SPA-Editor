function RoomPage(): HTMLElement {
  const container = document.createElement('div');
  const editorWrapper = document.createElement('div');
  const editor = document.createElement('textarea');
  const sidebar = document.createElement('div');
  const sidebarHeader = document.createElement('h1');
  const userList = document.createElement('ul');
  const message = document.createElement('p');

  container.className = 'room-page__container';
  editorWrapper.className = 'editor-wrapper';
  sidebar.className = 'sidebar';
  sidebarHeader.textContent = '참여자 목록';

  sidebar.append(sidebarHeader, userList, message);
  editorWrapper.append(editor);
  container.append(editorWrapper, sidebar);

  return container;
}

export default RoomPage;
