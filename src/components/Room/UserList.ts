import { User } from 'types';
import createElement from 'utils/createElement';

const roomUsers: User[] = [];

export default function UserList({
  users,
  user,
}: {
  users: User[];
  user: User;
}): HTMLElement {
  const sidebar = createElement('div', 'sidebar');
  const header = createElement('h1');
  const list = createList(users, user);
  const message = createElement('p');
  header.textContent = '참여자 목록';
  sidebar.append(header, list, message);

  if (JSON.stringify(roomUsers) !== JSON.stringify(users)) {
    const newUser = users[users.length - 1];
    message.textContent = `${newUser.name}님이 입장했습니다`;
    setTimeout(() => {
      message.textContent = '';
    }, 2000);
  }

  return sidebar;
}

function createList(users: User[], user: User) {
  const listItems = users.map(({ name }) => {
    const li = createElement('li', name === user.name ? 'user' : undefined);
    li.textContent = name;
    return li;
  });

  const list = createElement('ul');
  list.append(...listItems);

  return list;
}
