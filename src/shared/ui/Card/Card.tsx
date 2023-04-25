/* eslint-disable no-unused-vars */
import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  theme?: CardTheme;
  max?: boolean;
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    theme = CardTheme.NORMAL,
    max,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(cls.Card, [className, cls[theme]], { [cls.max]: max })}
      {...otherProps}
    >
      {children}
    </div>
  );
});