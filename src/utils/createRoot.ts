function createRoot(rootElement: HTMLElement) {
  let currentPage: HTMLElement;

  const root = {
    render(
      routes: { path: string; pageComponent: () => HTMLElement }[],
      fallback: () => HTMLElement
    ) {
      const changePage = () => {
        const matched = routes.find(
          ({ path }) => path === window.location.pathname
        );

        const page = matched ? matched.pageComponent() : fallback();

        if (page !== currentPage) {
          rootElement.innerHTML = '';
          rootElement.append(page);
          currentPage = page;
        }
      };

      window.addEventListener('popstate', changePage);

      changePage();
    },
  };

  return root;
}

export default createRoot;
