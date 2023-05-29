import { ReactElement, memo } from 'react';

import cls from './StickyContentLayout.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
  const {
    className,
    content,
    left,
    right,
  } = props;

  return (
    <div className={classNames(cls.StickyContentLayout, [className], {})}>
      {right && <div className={cls.right}>{right}</div>}
      <div className={cls.content}>{content}</div>
      {left && <div className={cls.left}>{left}</div>}
    </div>
  );
});