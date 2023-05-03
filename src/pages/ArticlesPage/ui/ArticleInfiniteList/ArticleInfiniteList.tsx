import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getArticleInfiniteListError,
  getArticleInfiniteListIsLoading,
  getArticleInfiniteListView,
} from '../../model/selectors/articleInfiniteListSelectors';
import { getArticles } from '../../model/slices/articleInfiniteListSlice';

import { ArticleList } from '@/entities/Article';
import { Text } from '@/shared/ui/Text';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticleInfiniteListIsLoading);
  const view = useSelector(getArticleInfiniteListView);
  const error = useSelector(getArticleInfiniteListError);
  const { t } = useTranslation();

  if (error) {
    return <Text text={t('Ошибка при загрузке статей')} />;
  }

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
    />
  );
});