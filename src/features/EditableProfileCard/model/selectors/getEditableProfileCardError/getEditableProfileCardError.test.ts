import { getEditableProfileCardError } from './getEditableProfileCardError';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('getEditableProfileCardError.test', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      editableProfileCard: {
        error: 'error',
      },
    };
    expect(getEditableProfileCardError(state as StateSchema)).toEqual('error');
  });

  test('should works with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getEditableProfileCardError(state as StateSchema)).toEqual(undefined);
  });
});
