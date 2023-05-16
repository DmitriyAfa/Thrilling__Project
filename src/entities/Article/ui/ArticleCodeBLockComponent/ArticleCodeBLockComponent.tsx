import { memo } from 'react';

import { ArticleCodeBLock } from '../../model/types/article';

import cls from './ArticleCodeBLockComponent.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/deprecated/Code';

interface ArticleCodeBLockComponentProps {
  block: ArticleCodeBLock;
  className?: string;
}

export const ArticleCodeBLockComponent = memo((props: ArticleCodeBLockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.ArticleCodeBLockComponent, [className], {})}>
      <Code text={block.code} />
    </div>
  );
});