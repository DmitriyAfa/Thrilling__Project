import { Suspense } from 'react';

import { AppRouter } from './providers/router';

import { Theme } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

export const DeprecatedApp = ({ theme }: { theme: Theme }) => (
  //   const { theme } = useTheme(); ---> prop { theme }: {theme: Theme}

  <div className={classNames('app', [theme])}>
    <Suspense fallback=''>
      <Navbar />
      <div className='content-page'>
        <Sidebar />
        <AppRouter />
      </div>
    </Suspense>
  </div>
);
