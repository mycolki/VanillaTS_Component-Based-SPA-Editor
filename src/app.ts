import MainPage from 'pages/main';
import NotFoundPage from 'pages/notFound';
import RoomPage from 'pages/room';

const routes = [
  { path: '/', pageComponent: MainPage },
  { path: '/room', pageComponent: RoomPage },
];

export default {
  routes,
  fallback: NotFoundPage,
};
