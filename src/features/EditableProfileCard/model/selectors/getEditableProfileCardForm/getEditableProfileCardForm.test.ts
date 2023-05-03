import { getEditableProfileCardForm } from './getEditableProfileCardForm';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getEditableProfileCardForm.test', () => {
  test('should return data', () => {
    const data = {
      username: 'admin',
      age: 22,
      country: Country.USA,
      first: 'first',
      lastname: 'lastname',
      city: 'city',
      currency: Currency.USD,
    };
    const state: DeepPartial<StateSchema> = {
      editableProfileCard: {
        form: data,
      },
    };
    expect(getEditableProfileCardForm(state as StateSchema)).toEqual(data);
  });

  test('should works with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getEditableProfileCardForm(state as StateSchema)).toEqual(undefined);
  });
});
