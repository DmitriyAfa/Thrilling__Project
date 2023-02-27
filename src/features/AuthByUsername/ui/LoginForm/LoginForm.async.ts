import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

// Из-за memo LoginForm и lazy в LoginFormAsync теряются типы. Чтобы исправить это добавлена типизация для LoginFormAsync-компонента
export const LoginFormAsync = lazy<FC<LoginFormProps>>(
  () => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./LoginForm')), 1500);
  }),
);