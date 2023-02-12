import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader';

export const AppRouter = () => {
  return (
    <div className="page-wrapper">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {
            Object.values(routeConfig)
              .map(({ path, element }) => {
                return <Route key={path} path={path} element={element} />;
              })
          }
        </Routes>
      </Suspense>
    </div>
  );
};
