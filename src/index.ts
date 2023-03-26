import './style.css';
import createRoot from 'utils/createRoot';
import app from './app';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(app.routes, app.fallback);
}
