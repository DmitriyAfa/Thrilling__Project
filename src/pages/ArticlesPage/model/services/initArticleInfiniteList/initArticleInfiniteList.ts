import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getArticlesPageInited,
} from '../../selectors/articlesPageSelectors';
import { ArticleInfiniteListActions } from '../../slices/articleInfiniteListSlice';
import { fetchArticlesList } from '../fetchArticleInfiniteList/fetchArticleInfiniteList';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleType, ArticlesSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

export const initArticleInfiniteList = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>(
  'ArticleInfiniteList/initArticleInfiniteList',
  async (searchParams, thankApi) => {
    const { getState, dispatch } = thankApi;
    const inited = getArticlesPageInited(getState());
    // если state не проинициализирован, то инициализируем его и вызываем fetch-запрос
    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrder;
      const sortFromUrl = searchParams.get('sort') as ArticlesSortField;
      const searchFromUrl = searchParams.get('search');
      const typeFromUrl = searchParams.get('type') as ArticleType;

      if (orderFromUrl) {
        dispatch(ArticleInfiniteListActions.setOrder(orderFromUrl));
      }
      if (sortFromUrl) {
        dispatch(ArticleInfiniteListActions.setSort(sortFromUrl));
      }
      if (searchFromUrl) {
        dispatch(ArticleInfiniteListActions.setSearch(searchFromUrl));
      }
      if (typeFromUrl) {
        dispatch(ArticleInfiniteListActions.setType(typeFromUrl));
      }
      // Сначала инициализируем лимит с нужным значением
      dispatch(ArticleInfiniteListActions.initState());
      // при загрузке страницы подгружаем первую порцию данных
      dispatch(fetchArticlesList({}));
    }
  },
);