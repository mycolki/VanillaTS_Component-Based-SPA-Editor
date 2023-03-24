type RoutPath = '/' | '/enter-room' | '/room';

export default function navigate(path: RoutPath) {
  window.location.href = path;
}
