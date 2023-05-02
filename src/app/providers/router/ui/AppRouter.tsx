import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeConfig } from '../config/routeConfig';

import { RequireAuth } from './RequireAuth';

import { AppRoutesProps } from '@/shared/types/router';
import { PageLoader } from '@/widgets/PageLoader';

export const AppRouter = memo(() => {
  // Защищенные роуты
  const renderWithWrapper = useCallback(({
    path, element, authOnly, roles,
  }: AppRoutesProps) => {
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
            <RequireAuth
              roles={roles}
            >
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
