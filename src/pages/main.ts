function MainPage(): HTMLElement {
  const container = document.createElement('div');
  const createRoomButton = document.createElement('button');

  createRoomButton.textContent = '방 만들기';
  createRoomButton.className = 'create-room__button';
  container.className = 'main-page__container';

  createRoomButton.addEventListener('click', () => {
    const entryWithNicknameBox = makeEntryWithNicknameBox();
    container.removeChild(createRoomButton);
    container.append(entryWithNicknameBox);
  });

  container.append(createRoomButton);

  return container;
}

export default MainPage;

const makeEntryWithNicknameBox = () => {
  const box = document.createElement('div');
  const header = document.createElement('h1');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const enterRoomButton = document.createElement('button');

  box.className = 'nickname-box';
  form.className = 'nickname-box__form';
  header.textContent = '닉네임 설정';
  input.setAttribute('placeholder', '닉네임을 입력해 주세요');
  input.type = 'text';
  enterRoomButton.type = 'submit';
  enterRoomButton.textContent = '입장하기';

  enterRoomButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (!input.value) {
      alert('닉네임을 입력해 주세요.');
      return;
    }

    console.log('입장 버튼 클릭');
  });

  form.append(input, enterRoomButton);
  box.append(header, form);

  return box;
};
