import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileErrors } from '../../types/profile';
import { validateProfileData } from './validateProfile';

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
    const result = validateProfileData(data);

    // все нужные поля заполненны, ошибки не будет. Поэтому ожидаем пустой массив
    expect(result).toEqual([]);
  });

  test('without first and last name', async () => {
    const result = validateProfileData({ ...data, first: '', lastname: '' });

    expect(result).toEqual([
      ValidateProfileErrors.INCORRECT_USER_DATA,
    ]);
  });

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: 0 });

    expect(result).toEqual([
      ValidateProfileErrors.ICORRECT_AGE,
    ]);
  });

  test('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([
      ValidateProfileErrors.INCORRECT_COUNTRY,
    ]);
  });

  test('all incorrect', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileErrors.INCORRECT_USER_DATA,
      ValidateProfileErrors.ICORRECT_AGE,
      ValidateProfileErrors.INCORRECT_COUNTRY,
    ]);
  });
});
