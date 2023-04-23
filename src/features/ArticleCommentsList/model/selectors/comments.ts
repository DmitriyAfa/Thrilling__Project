import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articleCommentsList?.isLoading;
export const getArticleCommentsError = (state: StateSchema) => state.articleCommentsList?.isLoading;
