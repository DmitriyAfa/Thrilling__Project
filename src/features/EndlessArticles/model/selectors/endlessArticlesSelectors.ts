import { StateSchema } from 'app/providers/StoreProvider';
import { ArticlesSortField, ArticleType, ArticleView } from 'entities/Article';

export const getEndlessArticlesIsLoading = (state: StateSchema) => state.endlessArticles?.isLoading || false;
export const getEndlessArticlesError = (state: StateSchema) => state.endlessArticles?.error;
export const getEndlessArticlesView = (state: StateSchema) => state.endlessArticles?.view || ArticleView.SMALL;
export const getEndlessArticlesPageNum = (state: StateSchema) => state.endlessArticles?.page || 1;
export const getEndlessArticlesLimit = (state: StateSchema) => state.endlessArticles?.limit || 9;
export const getEndlessArticlesHasMore = (state: StateSchema) => state.endlessArticles?.hasMore;
export const getEndlessArticlesInited = (state: StateSchema) => state.endlessArticles?._inited;
export const getEndlessArticlesOrder = (state: StateSchema) => state.endlessArticles?.order ?? 'asc';
export const getEndlessArticlesSort = (state: StateSchema) => state.endlessArticles?.sort ?? ArticlesSortField.CREATED;
export const getEndlessArticlesType = (state: StateSchema) => state.endlessArticles?.type ?? ArticleType.ALL;
export const getEndlessArticlesSearch = (state: StateSchema) => state.endlessArticles?.search ?? '';
