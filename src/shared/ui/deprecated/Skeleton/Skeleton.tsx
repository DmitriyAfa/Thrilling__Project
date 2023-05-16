import { memo, CSSProperties } from 'react';

import cls from './Skeleton.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Skeleton = memo((props: SkeletonProps) => {
  const {
    className,
    height,
    width,
    border,
  } = props;

  const styles: CSSProperties = {
    height,
    width,
    borderRadius: border,
  };

  return (
    <div
      style={styles}
      className={classNames(cls.skeleton, [className], {})}
    />

  );
});