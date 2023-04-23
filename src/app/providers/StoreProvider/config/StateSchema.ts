/* eslint-disable no-unused-vars */
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { ArticleCommentsListSchema } from '@/features/ArticleCommentsList';
import { EditableProfileCardSchema } from '@/features/EditableProfileCard';
import { addCommentFormSchema } from '@/features/AddCommentForm';
import { EndlessArticlesSchema } from '@/features/EndlessArticles';
import { ScrollRestorationSchema } from '@/features/ScrollRestoration';
import { ArticleRecommendationsSchema } from '@/features/ArticleRecommendations';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scrollRestoration: ScrollRestorationSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  // асинхронные редьюсеры
  loginForm?: LoginSchema;
  editableProfileCard?: EditableProfileCardSchema;
  articleDetails?: ArticleDetailsSchema;
  articleCommentsList?: ArticleCommentsListSchema;
  addCommentForm?: addCommentFormSchema;
  endlessArticles?: EndlessArticlesSchema;
  articleRecommendations?: ArticleRecommendationsSchema;
}

// достанем названия редьюсеров
export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true - редьюсер вмонтирован, false - еще нет или демонтирован
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager,
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;

  // Функционал обновления формы на сервере (put-запрос)
  state: StateSchema;
}