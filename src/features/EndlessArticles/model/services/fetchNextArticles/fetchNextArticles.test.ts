import { TestAsyncThun } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { fetchNextArticles } from './fetchNextArticles';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticles.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThun(fetchNextArticles, {
      endlessArticles: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    });
    await thunk.callThunk();
    /**
     * Проверяем количество вызовов dipatch. Должно быть 4 вызова
     * pending, fulfiled и 2 диспатча внутри самого экшена
     */
    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticlesList).toHaveBeenCalled();
  });
  test('fetchArticlesList did not call', async () => {
    const thunk = new TestAsyncThun(fetchNextArticles, {
      endlessArticles: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    });
    await thunk.callThunk();
    /**
     * Проверяем количество вызовов dipatch. Должно быть 2 вызова
     *  Будут вызваны только pending, fulfiled
     */
    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
  test('loading', async () => {
    const thunk = new TestAsyncThun(fetchNextArticles, {
      endlessArticles: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true,
      },
    });
    await thunk.callThunk();
    /**
     * Проверяем количество вызовов dipatch. Должно быть 2 вызова
     *  Будут вызваны только pending, fulfiled
     */
    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
