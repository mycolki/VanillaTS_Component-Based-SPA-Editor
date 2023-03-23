import { postName, postRoom } from 'api/handlers';
import createElement from 'utils/createElement';
import navigate from 'utils/navigate';

export default function EnterRoomPage(): HTMLElement {
  const container = createElement('div', 'main-page__container');
  const box = createElement('div', 'name-box');
  const header = createElement('h1');
  const form = createElement('form', 'name-box__form');
  const input = createElement('input');
  const enterRoomButton = createElement('button');

  header.textContent = '닉네임 설정';
  input.setAttribute('placeholder', '닉네임을 입력해 주세요');
  input.setAttribute('required', '');
  input.autofocus = true;
  input.type = 'text';
  enterRoomButton.type = 'submit';
  enterRoomButton.textContent = '입장하기';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    setRoom(input.value);
    navigate('/room');
  });

  form.append(input, enterRoomButton);
  box.append(header, form);
  container.append(box);

  return container;
}

function setRoom(name: string) {
  postName(name);
  postRoom(name);
}
