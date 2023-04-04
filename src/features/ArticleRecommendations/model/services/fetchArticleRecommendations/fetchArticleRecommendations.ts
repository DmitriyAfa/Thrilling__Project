import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

/**
 * В реальном проекте нужно делать запрос на другой адрес.
 * Этот адрес будет отличен от адресса со статьями.
 * -
 * Например, это может быть адресс где с помощью алгоритмов будут возвращать
 * статьи или id статей в соответствии с алгоритмом рекоммендаций.
 */
export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>(
  'ArticleRecommendations/fetchArticleRecommendations',
  async (_, thankApi) => {
    const { extra, rejectWithValue } = thankApi;

    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _limit: 4,
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