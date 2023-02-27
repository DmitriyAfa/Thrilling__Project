import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
  // eslint-disable-next-line no-unused-vars
  [name in StateSchemaKey]?: Reducer;
}

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModelLoaderProps {
  children: any;
  reducer: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModelLoader: FC<DynamicModelLoaderProps> = (props: DynamicModelLoaderProps) => {
  const {
    children,
    reducer,
    removeAfterUnmount,
  } = props;

  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    Object.entries(reducer).forEach(([name, reducer]: ReducersListEntry) => {
      store.reducerManager.add(name, reducer);
      // отслеживаем инициализацию редьюсера
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducer).forEach(([name]: ReducersListEntry) => {
          store.reducerManager.remove(name);
          // отслеживаем демонтирование редьюсера
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};
