/* eslint-disable no-unused-vars */
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { ArticleCommentsListSchema } from 'features/ArticleCommentsList';
import { EditableProfileCardSchema } from 'features/EditableProfileCard';
import { addCommentFormSchema } from 'features/AddCommentForm';
import { EndlessArticlesSchema } from 'features/EndlessArticles';
import { ScrollRestorationSchema } from 'features/ScrollRestoration';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scrollRestoration: ScrollRestorationSchema;

  // асинхронные редьюсеры
  loginForm?: LoginSchema;
  editableProfileCard?: EditableProfileCardSchema;
  articleDetails?: ArticleDetailsSchema;
  articleCommentsList?: ArticleCommentsListSchema;
  addCommentForm?: addCommentFormSchema;
  endlessArticles?: EndlessArticlesSchema;
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

/*
  Типизация ThunkApiConfig (третьего) аргумента функции createAsyncThunk
  -
  Так выглядит типизация самой функции
  function createAsyncThunk<
  Returned, ThunkArg, ThunkApiConfig extends AsyncThunkConfig
  >(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<
    Returned,
    ThunkArg, ThunkApiConfig
    >,
    options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig
    >): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
  -
   ThunkApiConfig расширяется от AsyncThunkConfig, поэтому чтобы найти нужные аргументы
   для типизации ---> смотрим их в типизации AsyncThunkConfig

   AsyncThunkConfig = {
    state?: unknown;
    dispatch?: Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
  -
  Так как нам нужны поля rejectValue, extra и state - то, типизируем их переопределив.
};
 */
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;

  // Функционал обновления формы на сервере (put-запрос)
  state: StateSchema;
}