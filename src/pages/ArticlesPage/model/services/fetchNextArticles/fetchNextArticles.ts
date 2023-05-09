import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPagePageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticleInfiniteList/fetchArticlesList';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchNextArticles = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articlesPage/fetchNextArticles',
  async (_, thankApi) => {
    const { getState, dispatch } = thankApi;
    const hasMore = getArticlesPageHasMore(getState());
    const page = getArticlesPagePageNum(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (hasMore && !isLoading) {
      // изменяем state со страницей
      dispatch(articlesPageActions.setPage(page + 1));
      // подгружаем следующую порцию данных
      dispatch(fetchArticlesList({}));
    }
  },
);