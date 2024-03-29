import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import cls from './ArticleList.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

/**
 * Данный компонент будет использоваться не только как список статей,
 * но и как список рекоммендаций.
 * Поэтому будет принимать пропсы состатьями извне.
 *
 * view - тип отображения. Плитка или список.
 */

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => (
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton
        className={cls.card}
        key={index}
        view={view}
      />
    ))
);

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
    target,
  } = props;

  const { t } = useTranslation('article/ArticleList');

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
      target={target}
    />
  );

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, [className, cls[view]])}>
        <Text
          size={TextSize.L}
          title={t('Статьи не найдены')}
        />
      </div>
    );
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <HStack
          wrap='wrap'
          gap='16'
          className={classNames(cls.ArticleListRedesigned)}
          data-testid='ArticleList'
        >
          {articles.map(renderArticle)}
          {isLoading && getSkeletons(view)}
        </HStack>
      )}
      off={(
        <div
          className={classNames(cls.ArticleList, [className, cls[view]])}
          data-testid='ArticleList'
        >
          {articles.map(renderArticle)}
          {isLoading && getSkeletons(view)}
        </div>
      )}
    />
  );
});