import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThun } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ValidateProfileErrors } from '../../types/profile';
import { updateProfileData } from './updateProfileData';

const data = {
  username: 'admin',
  age: 22,
  country: Country.USA,
  first: 'first',
  lastname: 'lastname',
  city: 'city',
  currency: Currency.USD,
};

describe('updateProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThun(updateProfileData, {
      profile: {
        form: data,
      },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    const thunk = new TestAsyncThun(updateProfileData, {
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ValidateProfileErrors.SERVER_ERROR,
    ]);
  });

  test('validate error', async () => {
    const thunk = new TestAsyncThun(updateProfileData, {
      profile: {
        form: { ...data, lastname: '' },
      },
    });

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ValidateProfileErrors.INCORRECT_USER_DATA,
    ]);
  });
});
