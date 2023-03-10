import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';

/*
  Возвращаем Article
  Принимаем id статьи - это аргумент articleId типа string
*/
export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>(
  'articleDetails/fetchArticleById',
  async (articleId, thankApi) => {
    const { extra, rejectWithValue } = thankApi;
    try {
      const response = await extra.api.get<Article>(`/articles/${articleId}`);

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