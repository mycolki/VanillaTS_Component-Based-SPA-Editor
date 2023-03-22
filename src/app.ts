import MainPage from 'pages/main';
import NotFoundPage from 'pages/notFound';

const routes: { path: string; pageComponent: () => HTMLElement }[] = [
  { path: '/', pageComponent: MainPage },
];

export default {
  routes,
  fallback: NotFoundPage,
};
