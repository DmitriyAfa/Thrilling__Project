import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { ArticleRecommendsSchema } from '../types/articleRecommendsSchema';

const initialState: ArticleRecommendsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const articleRecommendsSlice = createSlice({
  name: 'articleRecommendsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: articleRecommendsActions } = articleRecommendsSlice;
export const { reducer: articleRecommendsReducer } = articleRecommendsSlice;
