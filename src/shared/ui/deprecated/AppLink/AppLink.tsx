import { memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import cls from './AppLink.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

export enum AppLinkTheme {
  // eslint-disable-next-line no-unused-vars
  PRIMARY = 'primary',
  // eslint-disable-next-line no-unused-vars
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children: ReactNode;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const AppLink = memo((props: AppLinkProps) => {
  const {
    className,
    children,
    to,
    theme = AppLinkTheme.PRIMARY,
    // eslint-disable-next-line no-unused-vars
    ...otherProps
  } = props;
  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
