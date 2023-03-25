import { User } from 'types';
import createElement from 'utils/createElement';

let roomUsers: User[] = [];

interface Props {
  users: User[];
  user: User;
}

export default function UserList({ users, user }: Props): HTMLElement {
  const sidebar = createElement('div', 'sidebar');
  const header = createElement('h1');
  const list = createList(users, user);
  const message = createElement('p');
  sidebar.append(header, list, message);
  header.textContent = '참여자 목록';

  if (JSON.stringify(roomUsers) !== JSON.stringify(users)) {
    const newUser = users[users.length - 1];
    roomUsers = users;

    message.textContent = `${newUser.name}님이 입장했습니다`;
    setTimeout(() => {
      message.textContent = '';
    }, 2000);
  }

  return sidebar;
}

const createList = (users: User[], user: User) => {
  const listItems = users.map(({ name }) => {
    const li = createElement('li', name === user.name ? 'user' : undefined);
    li.textContent = name;
    return li;
  });

  const list = createElement('ul');
  list.append(...listItems);

  return list;
};
