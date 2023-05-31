import { memo } from 'react';

import { ArticleImageBLock } from '../../model/types/article';

import cls from './ArticleImageBlockComponent.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

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
        <ToggleFeatures
          feature='isAppRedesigned'
          on={(
            <Text text={block.title} align='center' />
          )}
          off={(
            <TextDeprecated text={block.title} align={TextAlign.CENTER} />
          )}
        />
      )}
    </div>
  );
});