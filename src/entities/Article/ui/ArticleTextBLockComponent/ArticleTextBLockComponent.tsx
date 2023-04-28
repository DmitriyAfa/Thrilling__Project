import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { ArticleTextBLock } from '../../model/types/article';
import cls from './ArticleTextBLockComponent.module.scss';

interface ArticleTextBLockComponentProps {
  block: ArticleTextBLock;
  className?: string;
}

export const ArticleTextBLockComponent = memo((props: ArticleTextBLockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.articleTextBLockComponent, [className], {})}>
      {block.title && (
        <Text
          title={block.title}
          className={cls.title}
        />
      )}

      {block.paragraphs.map((paragraph) => (
        <Text
          key={paragraph}
          text={paragraph}
          className={cls.paragraph}
        />
      ))}
    </div>
  );
});