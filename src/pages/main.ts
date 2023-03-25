import createElement from 'utils/createElement';
import navigate from 'utils/navigate';

export default function MainPage(): HTMLElement {
  const createRoomButton = createElement('button', {
    className: 'create-room__button',
    textContent: '방 만들기',
    onclick() {
      navigate('/enter-room');
    },
  });

  const container = createElement('div', { className: 'main-page__container' }, createRoomButton);
  container.append(createRoomButton);

  return container;
}
