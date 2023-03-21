export default function render(
  routes: { path: string; pageComponent: () => string }[]
) {
  const handleRouteChange = () => {
    const currentPage = routes.find(
      ({ path }) => path === window.location.pathname
    );

    if (currentPage) {
      return currentPage.pageComponent();
    }
  };

  window.addEventListener('locationchange', handleRouteChange);
  return handleRouteChange();
}
