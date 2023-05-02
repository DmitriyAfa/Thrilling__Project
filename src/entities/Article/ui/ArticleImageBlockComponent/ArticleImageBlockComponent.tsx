import { memo } from 'react';

import { ArticleImageBLock } from '../../model/types/article';

import cls from './ArticleImageBlockComponent.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/Text';

interface ArticleImageBlockComponentProps {
  block: ArticleImageBLock;
  className?: string;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.ArticleImageBlockComponent, [className], {})}>
      <img src={block.src} className={cls.img} alt={block.title} />
      {block.title && (
        <Text text={block.title} align={TextAlign.CENTER} />
      )}
    </div>
  );
});