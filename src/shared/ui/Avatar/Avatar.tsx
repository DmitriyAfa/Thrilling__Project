import { CSSProperties, useMemo } from 'react';

import cls from './Avatar.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    alt,
    size,
  } = props;

  // Используем useMemo чтобы при рендере компонентов не было лишних перересовок
  // eslint-disable-next-line arrow-body-style
  const style = useMemo<CSSProperties>(() => {
    return {
      width: size || 100,
      height: size || 100,
    };
  }, [size]);

  return (
    <img
      className={classNames(cls.Avatar, [className])}
      style={style}
      src={src}
      alt={alt}
    />
  );
};
