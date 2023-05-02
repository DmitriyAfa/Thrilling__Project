import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getEndlessArticlesLimit,
  getEndlessArticlesOrder,
  getEndlessArticlesPageNum,
  getEndlessArticlesSearch,
  getEndlessArticlesSort,
  getEndlessArticlesType,
} from '../../selectors/endlessArticlesSelectors';

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
  'EndlessArticles/fetchArticlesList',
  async (_, thankApi) => {
    const { extra, rejectWithValue, getState } = thankApi;
    const limit = getEndlessArticlesLimit(getState());
    const order = getEndlessArticlesOrder(getState());
    const sort = getEndlessArticlesSort(getState());
    const search = getEndlessArticlesSearch(getState());
    const page = getEndlessArticlesPageNum(getState());
    const type = getEndlessArticlesType(getState());
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