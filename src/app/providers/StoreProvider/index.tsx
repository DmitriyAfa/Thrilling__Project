// components
export { StoreProvider } from './ui/StoreProvider';

// configs
export { createReduxStore } from './config/store';

// types
export type {
  StateSchema,
  ReduxStoreWithManager,
  ThunkConfig,
  StateSchemaKey,
} from './config/StateSchema';
export type { AppDispatch } from './config/store';