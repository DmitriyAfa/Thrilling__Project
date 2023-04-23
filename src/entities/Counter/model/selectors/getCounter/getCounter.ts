// Импорт из вышестоящего слоя - исключение из правил архитектуры FSD
import { StateSchema } from '@/app/providers/StoreProvider';

export const getCounter = (state: StateSchema) => state.counter;
