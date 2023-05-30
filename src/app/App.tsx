import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { DeprecatedApp } from './DeprecatedApp';
import { AppRouter } from './providers/router';

import { getUserInited, initAuthData } from '@/entities/User';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  // Защищенные роуты
  const inited = useSelector(getUserInited);
  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return (
      <div className={classNames('app', [theme])}>
        <PageLoader />
      </div>
    );
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      off={<DeprecatedApp />}
      on={(
        <div id='app' className={classNames('app_redesigned', [theme])}>
          <Suspense fallback=''>
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={<div>TOOLBAR</div>}
            />
          </Suspense>
        </div>
      )}
    />
  );
};

export default App;
