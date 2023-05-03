import { CSSProperties, useMemo } from 'react';

import userIcon from '../../assets/icons/user.svg';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

import cls from './Avatar.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
  fallbackInverted?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    alt,
    size,
    fallbackInverted,
  } = props;

  // Используем useMemo чтобы при рендере компонентов не было лишних перересовок
  // eslint-disable-next-line arrow-body-style
  const style = useMemo<CSSProperties>(() => {
    return {
      width: size || 100,
      height: size || 100,
    };
  }, [size]);

  const fallback = <Skeleton width={size} height={size} border='50%' />;
  const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={userIcon} />;

  return (
    <AppImage
      className={classNames(cls.Avatar, [className])}
      style={style}
      src={src}
      alt={alt}
      fallback={fallback}
      errorFallback={errorFallback}
    />
  );
};
