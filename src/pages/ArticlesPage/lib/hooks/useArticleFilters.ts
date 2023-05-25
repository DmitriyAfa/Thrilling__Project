import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  getArticlesPageOrder, getArticlesPageSort, getArticlesPageSearch, getArticlesPageType, getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticleInfiniteList/fetchArticlesList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';

import { ArticlesSortField, ArticleType, ArticleView } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';

/**
  useArticleFilters является одним источником истины, который можно использовать во многих местах.
 */

export function useArticleFilters() {
  const dispatch = useAppDispatch();
  const order = useSelector(getArticlesPageOrder);
  const sort = useSelector(getArticlesPageSort);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);
  const view = useSelector(getArticlesPageView);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debounceFetchData = useDebounce(fetchData, 500);
  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);
  const onChangeSort = useCallback((newSort: ArticlesSortField) => {
    dispatch(articlesPageActions.setSort(newSort));
    // после запроса сбрасываем страницу на 1, Чтобы поиск шел с 1 страницы, а не со страницы до которой пролистал пользователь
    dispatch(articlesPageActions.setPage(1));
    debounceFetchData();
  }, [dispatch, debounceFetchData]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search));
    dispatch(articlesPageActions.setPage(1));
    debounceFetchData();
  }, [dispatch, debounceFetchData]);

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(articlesPageActions.setType(value));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  return {
    order,
    sort,
    search,
    type,
    view,
    onChangeView,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
  };
}