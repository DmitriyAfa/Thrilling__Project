import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
  // eslint-disable-next-line no-unused-vars
  PRIMARY = 'primary',
  // eslint-disable-next-line no-unused-vars
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    className, children, to, theme, ...otherProps
  } = props;
  return (
    <Link to={to} className={classNames(cls.AppLink, [className, cls[theme]])}>
      {children}
    </Link>
  );
};
