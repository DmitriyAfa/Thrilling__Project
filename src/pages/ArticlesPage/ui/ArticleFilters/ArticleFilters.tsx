import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getArticleInfiniteListOrder,
  getArticleInfiniteListSearch,
  getArticleInfiniteListSort,
  getArticleInfiniteListType,
  getArticleInfiniteListView,
} from '../../model/selectors/articleInfiniteListSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticleInfiniteList/fetchArticleInfiniteList';
import { ArticleInfiniteListActions } from '../../model/slices/articleInfiniteListSlice';

import cls from './ArticleFilters.module.scss';

import { ArticlesSortField, ArticleView, ArticleType } from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

interface ArticleFiltersProps {
  className?: string;
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation('article/ArticleFilters');
  const dispatch = useAppDispatch();
  const view = useSelector(getArticleInfiniteListView);
  const order = useSelector(getArticleInfiniteListOrder);
  const sort = useSelector(getArticleInfiniteListSort);
  const search = useSelector(getArticleInfiniteListSearch);
  const type = useSelector(getArticleInfiniteListType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debounceFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(ArticleInfiniteListActions.setView(view));
  }, [dispatch]);

  const onChangeSort = useCallback((newSort: ArticlesSortField) => {
    dispatch(ArticleInfiniteListActions.setSort(newSort));
    // после запроса сбрасываем страницу на 1, Чтобы поиск шел с 1 страницы, а не со страницы до которой пролистал пользователь
    dispatch(ArticleInfiniteListActions.setPage(1));
    debounceFetchData();
  }, [dispatch, debounceFetchData]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(ArticleInfiniteListActions.setOrder(newOrder));
    dispatch(ArticleInfiniteListActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSearch = useCallback((search: string) => {
    dispatch(ArticleInfiniteListActions.setSearch(search));
    dispatch(ArticleInfiniteListActions.setPage(1));
    debounceFetchData();
  }, [dispatch, debounceFetchData]);

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(ArticleInfiniteListActions.setType(value));
    dispatch(ArticleInfiniteListActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  return (
    <div className={classNames(cls.ArticleFilters, [className], {})}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t('Поиск')}
        />
      </Card>
      <ArticleTypeTabs
        className={cls.tabs}
        onChangeType={onChangeType}
        value={type}
      />
    </div>
  );
});