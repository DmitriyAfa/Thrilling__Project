import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getArticlesPageLimit,
  getArticlesPageOrder,
  getArticlesPagePageNum,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

// Опишем аргументы которые ожидаем на вход
interface FetchArticlesListArgs {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListArgs,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (_, thankApi) => {
    const { extra, rejectWithValue, getState } = thankApi;
    const limit = getArticlesPageLimit(getState());
    const order = getArticlesPageOrder(getState());
    const sort = getArticlesPageSort(getState());
    const search = getArticlesPageSearch(getState());
    const page = getArticlesPagePageNum(getState());
    const type = getArticlesPageType(getState());
    try {
      addQueryParams({
        sort, order, search, type,
      });
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type,
        },
      });

      // Если с сервера не вернулись данные, тогда пробрасываем ошибку
      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (err) {
      return rejectWithValue('error');
    }
  },
);