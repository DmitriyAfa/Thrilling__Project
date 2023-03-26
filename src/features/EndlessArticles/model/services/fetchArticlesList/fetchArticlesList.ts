import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getEndlessArticlesLimit } from '../../selectors/endlessArticlesSelectors';

// Опишем аргументы которые ожидаем на вход
interface FetchArticlesListArgs {
  // номер страницы
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListArgs,
  ThunkConfig<string>
>(
  'EndlessArticles/fetchArticlesList',
  async (args, thankApi) => {
    const { extra, rejectWithValue, getState } = thankApi;

    const { page = 1 } = args;
    const limit = getEndlessArticlesLimit(getState());

    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
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