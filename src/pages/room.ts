import createElement from 'utils/createElement';
import { getMyName, getRoom } from 'api/handlers';
import navigate from 'utils/navigate';
import Editor from 'components/Room/Editor';
import UserNameList from 'components/Room/UserNameList';

export default function RoomPage(): HTMLElement {
  const container = createElement('div', 'room-page__container');
  const myName = getMyName();
  const roomData = getRoomData();

  if (!myName) {
    alert('닉네임 설정 페이지로 이동합니다. 😀');
    navigate('/enter-room');
    return container;
  }

  if (!roomData) {
    alert('방이 존재하지 않습니다. 메인페이지로 이동합니다. 😀');
    navigate('/');
    return container;
  }

  const { contents, userNames } = roomData;
  const editor = Editor({ contents });
  const participants = UserNameList({ userNames, myName });

  container.append(editor, participants);

  return container;
}

function getRoomData() {
  try {
    const room = getRoom();

    return room;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      navigate('/');
    }
  }
}
