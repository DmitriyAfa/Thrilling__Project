/* eslint-disable react/button-has-type */
/* eslint-disable i18next/no-literal-string */
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense } from 'react';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { AppRouter } from './providers/router';

const App = () => {
  const { theme } = useTheme();
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
