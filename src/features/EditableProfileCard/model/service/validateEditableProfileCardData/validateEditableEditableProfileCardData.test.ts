import { ValidateEditableProfileCardErrors } from '../../types/editableProfileCard';

import { validateEditableProfileCardData } from './validateEditableProfileCardData';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

/*
  Функции валидации особенно важно тестировать
  1. Их легко сломать
  2. Такие функции могут нанести большой вред приложению.
  Например, есть форма регистрации или входа. --->
  Кто-то ее немног оподправил и получилось так, что форма перестала работать --->
  Сервис сломан и пользователь ен сможет его использовать, а значит и доступ к
  продуктовому сервису не получат.
*/

const data = {
  username: 'admin',
  age: 22,
  country: Country.USA,
  first: 'first',
  lastname: 'lastname',
  city: 'city',
  currency: Currency.USD,
};

describe('validateProfile.test', () => {
  test('validate is successfully', async () => {
    // validateProfile - не asyncThunk, поэтому просто вызовим функцию валидации профиля
    const result = validateEditableProfileCardData(data);

    // все нужные поля заполненны, ошибки не будет. Поэтому ожидаем пустой массив
    expect(result).toEqual([]);
  });

  test('without first and last name', async () => {
    const result = validateEditableProfileCardData({ ...data, first: '', lastname: '' });

    expect(result).toEqual([
      ValidateEditableProfileCardErrors.INCORRECT_USER_DATA,
    ]);
  });

  test('incorrect age', async () => {
    const result = validateEditableProfileCardData({ ...data, age: 0 });

    expect(result).toEqual([
      ValidateEditableProfileCardErrors.ICORRECT_AGE,
    ]);
  });

  test('incorrect country', async () => {
    const result = validateEditableProfileCardData({ ...data, country: undefined });

    expect(result).toEqual([
      ValidateEditableProfileCardErrors.INCORRECT_COUNTRY,
    ]);
  });

  test('all incorrect', async () => {
    const result = validateEditableProfileCardData({});

    expect(result).toEqual([
      ValidateEditableProfileCardErrors.INCORRECT_USER_DATA,
      ValidateEditableProfileCardErrors.ICORRECT_AGE,
      ValidateEditableProfileCardErrors.INCORRECT_COUNTRY,
    ]);
  });
});
