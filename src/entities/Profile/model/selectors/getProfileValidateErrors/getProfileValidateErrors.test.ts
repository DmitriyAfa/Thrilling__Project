import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileErrors } from '../../types/profile';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
  test('should works with filled state', () => {
    const errors = [
      ValidateProfileErrors.ICORRECT_AGE,
      ValidateProfileErrors.INCORRECT_USER_DATA,
    ];
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: errors,
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
  });

  test('should works with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
