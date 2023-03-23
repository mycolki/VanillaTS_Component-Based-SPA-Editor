import createElement from 'utils/createElement';

export default function UserNameList({
  userNames,
  myName,
}: {
  userNames: string[];
  myName: string;
}): HTMLElement {
  const sidebar = createElement('div', 'sidebar');
  const sidebarHeader = createElement('h1');
  const nameList = makeNameList(userNames, myName);
  const message = createElement('p');
  sidebarHeader.textContent = '참여자 목록';

  sidebar.append(sidebarHeader, nameList, message);

  return sidebar;
}

function makeNameList(userNames: string[], myName: string) {
  const userNameEls = userNames.map((name) => {
    const li = createElement('li', name === myName ? 'my-name' : undefined);
    li.textContent = name;

    return li;
  });

  const nameList = createElement('ul');
  nameList.append(...userNameEls);

  return nameList;
}
