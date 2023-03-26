import { getRoom } from 'api/handlers/room';
import createElement from 'utils/createElement';
import navigate from 'utils/navigate';

export default function MainPage(): HTMLElement {
  const createRoomButton = createElement('button', {
    className: 'create-room__button',
    textContent: '방 만들기',
    type: 'button',
    onclick() {
      navigate('/enter-room');
    },
  });

  const room = getRoom();

  if (room) {
    alert('방이 이미 존재합니다. 닉네임 설정 페이지로 이동합니다.');
    navigate('/enter-room');
  }

  const container = createElement('div', { className: 'main-page__container' }, createRoomButton);
  return container;
}
