import { ArticlesSortField, ArticleView } from '@/entities/Article';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input';
import { SortOrder } from '@/shared/types/sort';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { ArticleType } from '@/entities/Article/model/types/article';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { EndlessArticlesActions } from '../../model/slices/endlessArticlesSlice';
import {
  getEndlessArticlesOrder,
  getEndlessArticlesSearch,
  getEndlessArticlesSort,
  getEndlessArticlesType,
  getEndlessArticlesView,
} from '../../model/selectors/endlessArticlesSelectors';
import cls from './ArticleFilters.module.scss';
import { ArticleSortSelector } from '../ArticleSortSelector/ArticleSortSelector';
import { ArticleTypeTabs } from '../ArticleTypeTabs/ArticleTypeTabs';

interface ArticleFiltersProps {
  className?: string;
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation('article/ArticleFilters');
  const dispatch = useAppDispatch();
  const view = useSelector(getEndlessArticlesView);
  const order = useSelector(getEndlessArticlesOrder);
  const sort = useSelector(getEndlessArticlesSort);
  const search = useSelector(getEndlessArticlesSearch);
  const type = useSelector(getEndlessArticlesType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debounceFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(EndlessArticlesActions.setView(view));
  }, [dispatch]);

  const onChangeSort = useCallback((newSort: ArticlesSortField) => {
    dispatch(EndlessArticlesActions.setSort(newSort));
    // после запроса сбрасываем страницу на 1, Чтобы поиск шел с 1 страницы, а не со страницы до которой пролистал пользователь
    dispatch(EndlessArticlesActions.setPage(1));
    debounceFetchData();
  }, [dispatch, debounceFetchData]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(EndlessArticlesActions.setOrder(newOrder));
    dispatch(EndlessArticlesActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSearch = useCallback((search: string) => {
    dispatch(EndlessArticlesActions.setSearch(search));
    dispatch(EndlessArticlesActions.setPage(1));
    debounceFetchData();
  }, [dispatch, debounceFetchData]);

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(EndlessArticlesActions.setType(value));
    dispatch(EndlessArticlesActions.setPage(1));
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