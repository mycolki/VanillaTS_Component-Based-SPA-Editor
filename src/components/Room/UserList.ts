import { User } from 'types';
import createElement from 'utils/createElement';

let roomUsers: User[] = [];

interface Props {
  users: User[];
  user: User;
}

export default function UserList({ users, user }: Props): HTMLElement {
  const header = createElement('h1', { textContent: '참여자 목록' });
  const list = createList(users, user);
  const message = createElement('p');
  const sidebar = createElement('div', { className: 'sidebar' }, header, list, message);

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
    return createElement('li', {
      className: name === user.name ? 'user' : undefined,
      textContent: name,
    });
  });

  return createElement('ul', undefined, ...listItems);
};
