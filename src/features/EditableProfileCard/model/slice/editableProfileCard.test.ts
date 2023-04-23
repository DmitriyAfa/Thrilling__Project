import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { updateEditableProfileCardData } from '../service/updateEditableProfileCardData/updateEditableProfileCardData';
import { EditableProfileCardSchema, ValidateEditableProfileCardErrors } from '../types/editableProfileCard';
import { editableProfileCardActions, editableProfileCardReducer } from './editableProfileCardSlice';

const data = {
  username: 'admin',
  age: 22,
  country: Country.USA,
  first: 'first',
  lastname: 'lastname',
  city: 'city',
  currency: Currency.USD,
};

describe('editableProfileCardSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<EditableProfileCardSchema> = { readonly: false };
    expect(editableProfileCardReducer(
      state as EditableProfileCardSchema,
      editableProfileCardActions.setReadonly(true),
    )).toEqual({ readonly: true });
  });

  test('test cancel edit', () => {
    const state: DeepPartial<EditableProfileCardSchema> = { data, form: { username: '' } };

    expect(editableProfileCardReducer(
      state as EditableProfileCardSchema,
      editableProfileCardActions.cancelEdit(),
    )).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data,
    });
  });

  test('test update EditableProfileCard', () => {
    const state: DeepPartial<EditableProfileCardSchema> = { form: { username: '123' } };

    expect(editableProfileCardReducer(
      state as EditableProfileCardSchema,
      editableProfileCardActions.updateeditableProfileCard({
        username: 'Rick',
      }),
    )).toEqual({
      form: {
        username: 'Rick',
      },
    });
  });

  // Тест extra reducers

  test('test update EditableProfileCard service pending', () => {
    const state: DeepPartial<EditableProfileCardSchema> = {
      isLoading: false,
      validateErrors: [ValidateEditableProfileCardErrors.SERVER_ERROR],
    };

    expect(editableProfileCardReducer(
      state as EditableProfileCardSchema,
      updateEditableProfileCardData.pending,
    )).toEqual({
      error: undefined,
      isLoading: true,
      validateErrors: [ValidateEditableProfileCardErrors.SERVER_ERROR],
    });
  });

  test('test update EditableProfileCard service fulfilled', () => {
    const state: DeepPartial<EditableProfileCardSchema> = {
      isLoading: true,
    };

    expect(editableProfileCardReducer(
      state as EditableProfileCardSchema,
      updateEditableProfileCardData.fulfilled(data, ''),
    )).toEqual({
      isLoading: false,
      validateErrors: undefined,
      readonly: true,
      ValidateProfileError: undefined,
      form: data,
      data,
    });
  });
});
