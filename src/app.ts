import MainPage from 'pages/Main';
import EnterRoomPage from 'pages/EnterRoom';
import RoomPage from 'pages/Room';
import NotFoundPage from 'pages/NotFound';

const routes = [
  { path: '/', pageComponent: MainPage },
  { path: '/enter-room', pageComponent: EnterRoomPage },
  { path: '/room', pageComponent: RoomPage },
];

export default {
  routes,
  fallback: NotFoundPage,
};
