import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
  // Защищенные роуты
  const renderWithWrapper = useCallback(({ path, element, authOnly }: AppRoutesProps) => {
    const appRoute = (
      <Suspense fallback={<PageLoader />}>
        {element}
      </Suspense>
    );
    return (
      <Route
        key={path}
        path={path}
        element={authOnly
          ? (
            <RequireAuth>
              {appRoute}
            </RequireAuth>
          )
          : appRoute}
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  );
});
