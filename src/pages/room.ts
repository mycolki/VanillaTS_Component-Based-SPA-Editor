import createElement from 'utils/createElement';
import { getName, getRoom } from 'api/handlers';
import navigate from 'utils/navigate';
import Editor from 'components/Room/Editor';
import UserNameList from 'components/Room/UserNameList';

export default function RoomPage(): HTMLElement {
  const container = createElement('div', 'room-page__container');

  const myName = fetchData(getName, () => {
    navigate('/enter-room');
  });

  const roomData = fetchData(getRoom, () => {
    navigate('/');
  });

  if (!myName) {
    return container;
  }

  if (!roomData) {
    return container;
  }

  const { contents, userNames } = roomData;
  const editor = Editor({ contents });
  const userNameList = UserNameList({ userNames, myName });

  container.append(editor, userNameList);

  return container;
}

function fetchData<T>(fetchFn: () => T, callback: () => void) {
  try {
    const data = fetchFn();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      callback();
    }
  }
}
