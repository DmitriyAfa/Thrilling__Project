import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
  // eslint-disable-next-line no-unused-vars
  CLEAR = 'clear',
  // eslint-disable-next-line no-unused-vars
  OUTLINE = 'outline'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className, children, theme, ...otherProps
  } = props;

  return (
    <button
      {...otherProps}
      className={classNames(cls.Button, [className, cls[theme]])}
      type="button"
    >
      {children}
    </button>
  );
};
