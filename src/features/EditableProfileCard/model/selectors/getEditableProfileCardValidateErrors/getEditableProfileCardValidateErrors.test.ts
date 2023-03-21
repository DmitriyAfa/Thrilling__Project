import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateEditableProfileCardErrors } from '../../types/editableProfileCard';
import { getEditableProfileCardValidateErrors } from './getEditableProfileCardValidateErrors';

describe('getEditableProfileCardValidateErrors.test', () => {
  test('should works with filled state', () => {
    const errors = [
      ValidateEditableProfileCardErrors.ICORRECT_AGE,
      ValidateEditableProfileCardErrors.INCORRECT_USER_DATA,
    ];
    const state: DeepPartial<StateSchema> = {
      editableProfileCard: {
        validateErrors: errors,
      },
    };
    expect(getEditableProfileCardValidateErrors(state as StateSchema)).toEqual(errors);
  });

  test('should works with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getEditableProfileCardValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
