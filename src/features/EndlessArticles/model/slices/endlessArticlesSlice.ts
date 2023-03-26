import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { EndlessArticlesSchema } from '../types/endlessArticlesSchema';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.endlessArticles || articlesAdapter.getInitialState(),
);

export const EndlessArticlestSlice = createSlice({
  name: 'EndlessArticlesList',
  initialState: articlesAdapter.getInitialState<EndlessArticlesSchema>({
    view: ArticleView.SMALL,
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    page: 1,
    // При первой загрузке данных мы точно знаем, что какая-то порция данных прилетит с сервера. Поэтому true
    hasMore: true,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
      state.view = view;
      // Инициализируем лимит
      state.limit = view === ArticleView.BIG ? 4 : 9;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        // обнуляем ошибку если она вдруг была
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        articlesAdapter.addMany(state, action.payload);
        // Если с сервера пришли элементы [] значит считаем, что на сервере еще есть данные
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: EndlessArticlesActions } = EndlessArticlestSlice;
export const { reducer: EndlessArticlesReducer } = EndlessArticlestSlice;
