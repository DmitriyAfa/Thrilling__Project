import { memo } from 'react';

import { ArticleTextBLock } from '../../model/types/article';

import cls from './ArticleTextBLockComponent.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleTextBLockComponentProps {
  block: ArticleTextBLock;
  className?: string;
}

export const ArticleTextBLockComponent = memo((props: ArticleTextBLockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.articleTextBLockComponent, [className], {})}>
      {block.title && (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={(
            <Text
              title={block.title}
              className={cls.title}
            />
          )}
          off={(
            <TextDeprecated
              title={block.title}
              className={cls.title}
            />
          )}
        />
      )}

      {block.paragraphs.map((paragraph) => (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={(
            <Text
              key={paragraph}
              text={paragraph}
              className={cls.paragraph}
            />
          )}
          off={(
            <TextDeprecated
              key={paragraph}
              text={paragraph}
              className={cls.paragraph}
            />
          )}
        />
      ))}
    </div>
  );
});