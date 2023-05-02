import { getEditableProfileCardReadonly } from './getEditableProfileCardReadonly';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('getEditableProfileCardReadonly.test', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      editableProfileCard: {
        readonly: true,
      },
    };
    expect(getEditableProfileCardReadonly(state as StateSchema)).toEqual(true);
  });

  test('should works with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getEditableProfileCardReadonly(state as StateSchema)).toEqual(undefined);
  });
});
