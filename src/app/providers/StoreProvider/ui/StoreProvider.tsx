import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,
    initialState,
    asyncReducers,
  } = props;

  /**
   * Когда мы используем const navigate = useNavigate(); в createReduxStore
   * получается, что при каждом смене маршрута у нас происходит новый рендер StoreProvider
   * что влечет за собой новый вызов функции createReduxStore.
   * При каждом рендере мы создаем новый store и передаем его в Provider - так делать нельзя.
   *
   * Все это происходит из за
   */
  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
    // navigate,
  );

  console.log('Render');

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
