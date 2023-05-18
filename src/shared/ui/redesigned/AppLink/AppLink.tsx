import { memo, ReactNode } from 'react';
import { NavLink, LinkProps } from 'react-router-dom';

import cls from './AppLink.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children: ReactNode;
  activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    className,
    children,
    to,
    variant = 'primary',
    activeClassName = '',
    ...otherProps
  } = props;
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        cls.AppLink,
        [className, cls[variant]],
        { [activeClassName]: isActive },
      )}
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
