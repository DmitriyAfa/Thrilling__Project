import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { EndlessArticlesSchema } from '../types/endlessArticlesSchema';

import { StateSchema } from '@/app/providers/StoreProvider';
import {
  Article, ArticlesSortField, ArticleType, ArticleView,
} from '@/entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { SortOrder } from '@/shared/types/sort';

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
    _inited: false,
    limit: 9,
    sort: ArticlesSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticlesSortField>) => {
      state.sort = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
      state.view = view;
      // Инициализируем лимит
      state.limit = view === ArticleView.BIG ? 4 : 9;
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        // обнуляем ошибку если она вдруг была
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          // очищаем массив
          articlesAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false;
        // Сравниваем полученные данные с сервера (action) с заданным лимитом, если длина [] с сервера больше или равна лимиту, значит еще есть данные
        state.hasMore = action.payload.length >= state.limit;

        if (action.meta.arg.replace) {
          // в случае когда изменяем фильтр будем получать новую порцию данных
          articlesAdapter.setAll(state, action.payload);
        } else {
          // подгрузит новую порцию данных в конец
          articlesAdapter.addMany(state, action.payload);
        }
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
