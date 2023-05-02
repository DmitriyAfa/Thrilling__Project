import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getEndlessArticlesHasMore,
  getEndlessArticlesIsLoading,
  getEndlessArticlesPageNum,
} from '../../selectors/endlessArticlesSelectors';
import { EndlessArticlesActions } from '../../slices/endlessArticlesSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchNextArticles = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'EndlessArticles/fetchNextArticles',
  async (_, thankApi) => {
    const { getState, dispatch } = thankApi;
    const hasMore = getEndlessArticlesHasMore(getState());
    const page = getEndlessArticlesPageNum(getState());
    const isLoading = getEndlessArticlesIsLoading(getState());

    if (hasMore && !isLoading) {
      // изменяем state со страницей
      dispatch(EndlessArticlesActions.setPage(page + 1));
      // подгружаем следующую порцию данных
      dispatch(fetchArticlesList({}));
    }
  },
);