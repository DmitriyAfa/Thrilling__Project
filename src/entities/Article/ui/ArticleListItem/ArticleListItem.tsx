import { HTMLAttributeAnchorTarget, memo } from 'react';

import {
  Article, ArticleView,
} from '../../model/types/article';

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

import { ToggleFeatures } from '@/shared/lib/features';

export interface ArticleListItemProps {
  article: Article;
  view: ArticleView;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
    target,
  } = props;

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  );
});