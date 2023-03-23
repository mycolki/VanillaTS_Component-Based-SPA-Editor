export default function NotFoundPage(): HTMLElement {
  const header = document.createElement('h1');
  header.textContent = '페이지를 찾을 수 없습니다.';

  return header;
}
