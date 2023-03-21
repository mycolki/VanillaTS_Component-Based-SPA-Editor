import './style.css';
import app from './app';
import createRoot from 'utils/createRoot';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(app.routes, app.fallback);
}
