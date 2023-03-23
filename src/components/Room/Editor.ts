import createElement from 'utils/createElement';

export default function Editor({
  contents,
}: {
  contents: string;
}): HTMLElement {
  const editorWrapper = createElement('div', 'editor-wrapper');
  const editor = createElement('textarea');
  editor.textContent = contents;

  editorWrapper.append(editor);

  return editorWrapper;
}
