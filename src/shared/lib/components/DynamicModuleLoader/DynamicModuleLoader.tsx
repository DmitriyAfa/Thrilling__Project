import { Reducer } from '@reduxjs/toolkit';
import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';

export type ReducersList = {
  // eslint-disable-next-line no-unused-vars
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
}

interface DynamicModuleLoaderProps {
  children: ReactNode;
  reducer: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props: DynamicModuleLoaderProps) => {
  const {
    children,
    reducer,
    removeAfterUnmount = true,
  } = props;

  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    Object.entries(reducer).forEach(([name, reducer]) => {
      // проверяем вмонтирован ли текущий редьюсер
      const mounted = mountedReducers[name as StateSchemaKey];
      // добавляем редьюсер только еслт его нет
      if (!mounted) {
        // вызываем функцию add у reducerManager и указываем какой редьюсер хотим добавить по ключу
        store.reducerManager.add(name as StateSchemaKey, reducer);
        // отслеживаем инициализацию редьюсера
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducer).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          // отслеживаем демонтирование редьюсера
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // Пустой массив зависимостей - в момент монтирования компонента добавляем редьюсер с помощью reducerManager
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};
