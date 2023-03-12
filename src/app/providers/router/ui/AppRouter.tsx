import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
  // Защищенные роуты
  const renderWithWrapper = useCallback(({ path, element, authOnly }: AppRoutesProps) => {
    const appRoute = (
      <Suspense fallback={<PageLoader />}>
        <div className="page-wrapper">
          {element}
        </div>
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
