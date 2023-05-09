import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPagePageNum,
} from '../../selectors/articlesPageSelectors';
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
    const hasMore = getArticlesPageHasMore(getState());
    const page = getArticlesPagePageNum(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (hasMore && !isLoading) {
      // изменяем state со страницей
      dispatch(ArticleInfiniteListActions.setPage(page + 1));
      // подгружаем следующую порцию данных
      dispatch(fetchArticlesList({}));
    }
  },
);