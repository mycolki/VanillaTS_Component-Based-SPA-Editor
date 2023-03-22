function createRoot(rootElement: HTMLElement) {
  let currentPage: HTMLElement | null = null;

  const root = {
    render(
      routes: { path: string; pageComponent: () => HTMLElement }[],
      fallback: () => HTMLElement
    ) {
      const changePage = () => {
        const matched = routes.find(
          ({ path }) => path === window.location.pathname
        ) ?? {
          pageComponent: fallback,
        };

        const page = matched.pageComponent();

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
