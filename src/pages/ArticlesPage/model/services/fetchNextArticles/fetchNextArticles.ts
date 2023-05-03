import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getArticleInfiniteListHasMore,
  getArticleInfiniteListIsLoading,
  getArticleInfiniteListPageNum,
} from '../../selectors/articleInfiniteListSelectors';
import { ArticleInfiniteListActions } from '../../slices/articleInfiniteListSlice';
import { fetchArticlesList } from '../fetchArticleInfiniteList/fetchArticleInfiniteList';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchNextArticles = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'ArticleInfiniteList/fetchNextArticles',
  async (_, thankApi) => {
    const { getState, dispatch } = thankApi;
    const hasMore = getArticleInfiniteListHasMore(getState());
    const page = getArticleInfiniteListPageNum(getState());
    const isLoading = getArticleInfiniteListIsLoading(getState());

    if (hasMore && !isLoading) {
      // изменяем state со страницей
      dispatch(ArticleInfiniteListActions.setPage(page + 1));
      // подгружаем следующую порцию данных
      dispatch(fetchArticlesList({}));
    }
  },
);