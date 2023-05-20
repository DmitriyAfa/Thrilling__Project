import { CSSProperties, useMemo } from 'react';

import userIcon from '../../../assets/icons/user.svg';
import { AppImage } from '../../redesigned/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

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

  // eslint-disable-next-line arrow-body-style
  const style = useMemo<CSSProperties>(() => {
    return {
      width: size || 100,
      height: size || 100,
    };
  }, [size]);

  const fallback = <Skeleton width={size} height={size} border='50%' />;
  const errorFallback = <Icon width={size} height={size} Svg={userIcon} />;

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
