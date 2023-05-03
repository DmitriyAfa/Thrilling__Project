import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticlesSortField, ArticleType, ArticleView } from '@/entities/Article';

export const getArticleInfiniteListIsLoading = (state: StateSchema) => state.ArticleInfiniteList?.isLoading || false;
export const getArticleInfiniteListError = (state: StateSchema) => state.ArticleInfiniteList?.error;
export const getArticleInfiniteListView = (state: StateSchema) => state.ArticleInfiniteList?.view || ArticleView.SMALL;
export const getArticleInfiniteListPageNum = (state: StateSchema) => state.ArticleInfiniteList?.page || 1;
export const getArticleInfiniteListLimit = (state: StateSchema) => state.ArticleInfiniteList?.limit || 9;
export const getArticleInfiniteListHasMore = (state: StateSchema) => state.ArticleInfiniteList?.hasMore;
export const getArticleInfiniteListInited = (state: StateSchema) => state.ArticleInfiniteList?._inited;
export const getArticleInfiniteListOrder = (state: StateSchema) => state.ArticleInfiniteList?.order ?? 'asc';
export const getArticleInfiniteListSort = (state: StateSchema) => (
  state.ArticleInfiniteList?.sort ?? ArticlesSortField.CREATED
);
export const getArticleInfiniteListType = (state: StateSchema) => state.ArticleInfiniteList?.type ?? ArticleType.ALL;
export const getArticleInfiniteListSearch = (state: StateSchema) => state.ArticleInfiniteList?.search ?? '';
