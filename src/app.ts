import EnterRoomPage from 'pages/EnterRoom';
import MainPage from 'pages/Main';
import NotFoundPage from 'pages/NotFound';
import RoomPage from 'pages/Room';

const routes = [
  { path: '/', pageComponent: MainPage },
  { path: '/enter-room', pageComponent: EnterRoomPage },
  { path: '/room', pageComponent: RoomPage },
];

export default {
  routes,
  fallback: NotFoundPage,
};
