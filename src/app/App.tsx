/* eslint-disable react/button-has-type */
/* eslint-disable i18next/no-literal-string */
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { userActions } from 'entities/User';
import { useDispatch } from 'react-redux';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { AppRouter } from './providers/router';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);
  return (
    <div className={classNames('app', [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
