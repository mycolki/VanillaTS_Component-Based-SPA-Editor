import createElement from 'utils/createElement';

export default function NotFoundPage(): HTMLElement {
  const header = createElement('h1', { textContent: '페이지를 찾을 수 없습니다.' });
  return header;
}
