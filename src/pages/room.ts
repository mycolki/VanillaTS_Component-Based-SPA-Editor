import { getName, getRoom } from 'api/handlers';
import createElement from 'utils/createElement';
import navigate from 'utils/navigate';
import Editor from 'components/Room/Editor';
import UserNameList from 'components/Room/UserNameList';

export default function RoomPage(): HTMLElement {
  const container = createElement('div', 'room-page__container');

  const myName = fetchData(getName, () => navigate('/enter-room'));
  const roomData = fetchData(getRoom, () => navigate('/'));

  if (!myName || !roomData) {
    return container;
  }

  let editor = Editor(roomData);
  let userNameList = UserNameList({ userNames: roomData.userNames, myName });

  window.addEventListener('storage', () => {
    const updatedRoomData = fetchData(getRoom, () => navigate('/'));

    if (!updatedRoomData) {
      return;
    }

    container.removeChild(editor);
    container.removeChild(userNameList);

    const updatedEditor = Editor(updatedRoomData);
    const updatedUserNameList = UserNameList({
      userNames: updatedRoomData.userNames,
      myName,
    });

    container.append(updatedEditor, updatedUserNameList);
    editor = updatedEditor;
    userNameList = updatedUserNameList;
  });

  container.append(editor, userNameList);

  return container;
}

function fetchData<T>(fetchFn: () => T, errorCallback: () => void) {
  try {
    return fetchFn();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
    errorCallback();
  }
}
