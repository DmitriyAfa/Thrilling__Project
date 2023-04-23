import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleType, ArticlesSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import {
  getEndlessArticlesInited,
} from '../../selectors/endlessArticlesSelectors';
import { EndlessArticlesActions } from '../../slices/endlessArticlesSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initEndlessArticles = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>(
  'EndlessArticles/initEndlessArticles',
  async (searchParams, thankApi) => {
    const { getState, dispatch } = thankApi;
    const inited = getEndlessArticlesInited(getState());
    // если state не проинициализирован, то инициализируем его и вызываем fetch-запрос
    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrder;
      const sortFromUrl = searchParams.get('sort') as ArticlesSortField;
      const searchFromUrl = searchParams.get('search');
      const typeFromUrl = searchParams.get('type') as ArticleType;

      if (orderFromUrl) {
        dispatch(EndlessArticlesActions.setOrder(orderFromUrl));
      }
      if (sortFromUrl) {
        dispatch(EndlessArticlesActions.setSort(sortFromUrl));
      }
      if (searchFromUrl) {
        dispatch(EndlessArticlesActions.setSearch(searchFromUrl));
      }
      if (typeFromUrl) {
        dispatch(EndlessArticlesActions.setType(typeFromUrl));
      }
      // Сначала инициализируем лимит с нужным значением
      dispatch(EndlessArticlesActions.initState());
      // при загрузке страницы подгружаем первую порцию данных
      dispatch(fetchArticlesList({}));
    }
  },
);