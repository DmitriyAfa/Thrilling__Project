import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsIsLodaing = (state: StateSchema) => state.articleRecommendations?.isLoading;
export const getArticleRecommendationsError = (state: StateSchema) => state.articleRecommendations?.error;
