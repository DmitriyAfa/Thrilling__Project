import { StateSchema } from '@/app/providers/StoreProvider';
// Защищенные роуты
export const getUserInited = (state: StateSchema) => state.user._inited;