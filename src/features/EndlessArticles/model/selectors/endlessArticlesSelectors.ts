import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const getEndlessArticlesIsLoading = (state: StateSchema) => state.endlessArticles?.isLoading || false;
export const getEndlessArticlesError = (state: StateSchema) => state.endlessArticles?.error;
export const getEndlessArticlesView = (state: StateSchema) => state.endlessArticles?.view || ArticleView.SMALL;
