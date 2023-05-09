import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getArticlesPageInited,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticleInfiniteList/fetchArticlesList';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleType, ArticlesSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
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
        dispatch(articlesPageActions.setOrder(orderFromUrl));
      }
      if (sortFromUrl) {
        dispatch(articlesPageActions.setSort(sortFromUrl));
      }
      if (searchFromUrl) {
        dispatch(articlesPageActions.setSearch(searchFromUrl));
      }
      if (typeFromUrl) {
        dispatch(articlesPageActions.setType(typeFromUrl));
      }
      // Сначала инициализируем лимит с нужным значением
      dispatch(articlesPageActions.initState());
      // при загрузке страницы подгружаем первую порцию данных
      dispatch(fetchArticlesList({}));
    }
  },
);