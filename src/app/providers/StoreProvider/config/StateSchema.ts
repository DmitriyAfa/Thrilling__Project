/* eslint-disable no-unused-vars */
import {
  AnyAction,
  CombinedState,
  Dispatch,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;

  // асинхронные редьюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
}

// достанем названия редьюсеров
export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
  add: (key: StateSchemaKey, reducer: Reducer) => void,
  remove: (key: StateSchemaKey) => void,
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager,
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
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