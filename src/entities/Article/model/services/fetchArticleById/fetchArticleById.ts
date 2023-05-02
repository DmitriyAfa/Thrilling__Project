import { createAsyncThunk } from '@reduxjs/toolkit';

import { Article } from '../../types/article';

import { ThunkConfig } from '@/app/providers/StoreProvider';

/*
  Возвращаем Article
  Принимаем id статьи - это аргумент articleId типа string
*/
export const fetchArticleById = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>(
  'articleDetails/fetchArticleById',
  async (articleId, thankApi) => {
    const { extra, rejectWithValue } = thankApi;

    if (!articleId) {
      throw new Error('');
    }

    try {
      const response = await extra.api.get<Article>(`/articles/${articleId}`, {
        params: {
          _expand: 'user',
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