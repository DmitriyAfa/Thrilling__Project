import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getEndlessArticlesInited,
} from '../../selectors/endlessArticlesSelectors';
import { EndlessArticlesActions } from '../../slices/endlessArticlesSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initEndlessArticles = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'EndlessArticles/initEndlessArticles',
  async (_, thankApi) => {
    const { getState, dispatch } = thankApi;
    const inited = getEndlessArticlesInited(getState());
    // если state не проинициализирован, то инициализируем его и вызываем fetch-запрос
    if (!inited) {
      // Сначала инициализируем лимит с нужным значением
      dispatch(EndlessArticlesActions.initState());
      // при загрузке страницы подгружаем первую порцию данных
      dispatch(fetchArticlesList({
        page: 1,
      }));
    }
  },
);