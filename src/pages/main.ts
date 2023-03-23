import createElement from 'utils/createElement';
import navigate from 'utils/navigate';

export default function MainPage(): HTMLElement {
  const container = createElement('div', 'main-page__container');
  const createRoomButton = createElement('button', 'create-room__button');

  createRoomButton.textContent = '방 만들기';
  createRoomButton.addEventListener('click', () => {
    navigate('/enter-room');
  });

  container.append(createRoomButton);

  return container;
}
