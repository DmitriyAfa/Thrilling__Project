import { getUserAuthData } from 'entities/User';
import { memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader';

export const AppRouter = memo(() => {
  /*
    Защищенные роуты
    -
    isAuth
    Получаем информацию авторизован пользователь или нет.
    -
    routes
    Фильтруем маршруты: если пользователь не авторизован, то все маршруты с флагом authOnly не проходят проверку
   */
  const isAuth = useSelector(getUserAuthData);

  const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
    if (route.authOnly && !isAuth) {
      return false;
    }
    return true;
  }), [isAuth]);

  return (
    <div className="page-wrapper">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {
            routes
              .map(({ path, element }) => <Route key={path} path={path} element={element} />)
          }
        </Routes>
      </Suspense>
    </div>
  );
});
