import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticlesSortField, ArticleType, ArticleView } from '@/entities/Article';

export const getArticlesPageIsLoading = (state: StateSchema) => state.ArticleInfiniteList?.isLoading || false;
export const getArticlesPageError = (state: StateSchema) => state.ArticleInfiniteList?.error;
export const getArticlesPageView = (state: StateSchema) => state.ArticleInfiniteList?.view || ArticleView.SMALL;
export const getArticlesPagePageNum = (state: StateSchema) => state.ArticleInfiniteList?.page || 1;
export const getArticlesPageLimit = (state: StateSchema) => state.ArticleInfiniteList?.limit || 9;
export const getArticlesPageHasMore = (state: StateSchema) => state.ArticleInfiniteList?.hasMore;
export const getArticlesPageInited = (state: StateSchema) => state.ArticleInfiniteList?._inited;
export const getArticlesPageOrder = (state: StateSchema) => state.ArticleInfiniteList?.order ?? 'asc';
export const getArticlesPageSort = (state: StateSchema) => (
  state.ArticleInfiniteList?.sort ?? ArticlesSortField.CREATED
);
export const getArticlesPageType = (state: StateSchema) => state.ArticleInfiniteList?.type ?? ArticleType.ALL;
export const getArticlesPageSearch = (state: StateSchema) => state.ArticleInfiniteList?.search ?? '';
