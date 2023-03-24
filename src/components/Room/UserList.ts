import { User } from 'types';
import createElement from 'utils/createElement';

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
