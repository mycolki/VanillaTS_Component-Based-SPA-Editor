import createElement from 'utils/createElement';
import naviagte from 'utils/navigate';

export default function MainPage(): HTMLElement {
  const container = createElement('div', 'main-page__container');
  const createRoomButton = createElement('button', 'create-room__button');

  createRoomButton.textContent = '방 만들기';
  createRoomButton.addEventListener('click', () => {
    const nameForm = createNameForm();
    container.removeChild(createRoomButton);
    container.append(nameForm);
  });

  container.append(createRoomButton);

  return container;
}

function createNameForm() {
  const box = createElement('div', 'name-box');
  const header = createElement('h1');
  const form = createElement('form', 'name-box__form');
  const input = createElement('input');
  const enterRoomButton = createElement('button');

  header.textContent = '닉네임 설정';
  input.setAttribute('placeholder', '닉네임을 입력해 주세요');
  input.setAttribute('required', '');
  input.type = 'text';
  enterRoomButton.type = 'submit';
  enterRoomButton.textContent = '입장하기';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    setRoom(input.value);
    naviagte('/room');
  });

  form.append(input, enterRoomButton);
  box.append(header, form);

  return box;
};
