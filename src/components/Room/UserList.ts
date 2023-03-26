import { User } from 'types';
import createElement from 'utils/createElement';
import isPropsEqual from 'utils/isPropsEqual';

interface Props {
  users: User[];
  user: User;
}

let props: Props | null = null;
let memoizedUserList: HTMLElement | null = null;

export default function MemoizedUserList(newProps: Props): HTMLElement {
  const isEqualProps = isPropsEqual(props, newProps);

  if (!isEqualProps) {
    props = newProps;
    memoizedUserList = UserList(props);
    return memoizedUserList;
  }

  return memoizedUserList ?? UserList(newProps);
}

function UserList({ users, user }: Props): HTMLElement {
  const newUser = users[users.length - 1];
  const header = createElement('h1', { textContent: '참여자 목록' });
  const list = createList(users, user);
  const message = createElement('p', { textContent: `${newUser.name}님이 입장했습니다` });
  const sidebar = createElement('div', { className: 'sidebar' }, header, list, message);

  setTimeout(() => {
    message.textContent = '';
  }, 2000);

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
