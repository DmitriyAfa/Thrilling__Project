import {
  AnyAction,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import {
  MountedReducers,
  ReducerManager,
  StateSchema,
  StateSchemaKey,
} from './StateSchema';

// функция принимает дефолтные редьюсеры
export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // создаем корневой редьюсер
  let combinedReducer = combineReducers(reducers);

  // хранит название редьюсеров которые хотим удалить
  let keysToRemove: StateSchemaKey[] = [];

  const mountedReducers: MountedReducers = {};

  return {
    // функция просто возвращает редьюсеры
    getReducerMap: () => reducers,
    getMountedReducers: () => mountedReducers,
    // функция reduce и есть редьюсер
    // аргументом принимает state и action, как и обычный редьюсер.
    reduce: (state: StateSchema, action: AnyAction) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key];
        });
        keysToRemove = [];
      }

      // возвращаем новый редьюсер в который передаем state без лишних ключей
      return combinedReducer(state, action);
    },

    // добавляет по ключу новый редьюсер в основной редьюсер
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer;
      mountedReducers[key] = true;

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },

    // добавляет переданный ключь в массив и удаляет ключь из редьюсера
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      // Remove it from the reducer mapping
      delete reducers[key];
      // Add the key to the list of keys to clean up
      keysToRemove.push(key);

      mountedReducers[key] = false;

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },
  };
}
