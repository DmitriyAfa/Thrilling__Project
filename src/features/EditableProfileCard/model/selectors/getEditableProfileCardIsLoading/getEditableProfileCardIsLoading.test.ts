import { StateSchema } from '@/app/providers/StoreProvider';
import { getEditableProfileCardIsLoading } from './getEditableProfileCardIsLoading';

describe('getEditableProfileCardIsLoading.test', () => {
  test('should work with filled state', () => {
    const state: DeepPartial<StateSchema> = {
      editableProfileCard: {
        isLoading: true,
      },
    };
    expect(getEditableProfileCardIsLoading(state as StateSchema)).toEqual(true);
  });

  test('should works with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getEditableProfileCardIsLoading(state as StateSchema)).toEqual(undefined);
  });
});
