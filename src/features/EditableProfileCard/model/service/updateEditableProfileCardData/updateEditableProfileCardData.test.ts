import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThun } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ValidateEditableProfileCardErrors } from '../../types/editableProfileCard';
import { updateEditableProfileCardData } from './updateEditableProfileCardData';

const data = {
  id: '1',
  username: 'admin',
  age: 22,
  country: Country.USA,
  first: 'first',
  lastname: 'lastname',
  city: 'city',
  currency: Currency.USD,
};

describe('updateEditableProfileCardData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThun(updateEditableProfileCardData, {
      editableProfileCard: {
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
    const thunk = new TestAsyncThun(updateEditableProfileCardData, {
      editableProfileCard: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ValidateEditableProfileCardErrors.SERVER_ERROR,
    ]);
  });

  test('validate error', async () => {
    const thunk = new TestAsyncThun(updateEditableProfileCardData, {
      editableProfileCard: {
        form: { ...data, lastname: '' },
      },
    });

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ValidateEditableProfileCardErrors.INCORRECT_USER_DATA,
    ]);
  });
});
