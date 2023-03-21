import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThun } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchEditableProfileCardData } from './fetchEditableProfileCardData';

const data = {
  username: 'admin',
  age: 22,
  country: Country.USA,
  first: 'first',
  lastname: 'lastname',
  city: 'city',
  currency: Currency.USD,
};

describe('fetchEditableProfileCardData.test', () => {
  // запрос выполнился удачно
  test('success', async () => {
    // 0.
    const thunk = new TestAsyncThun(fetchEditableProfileCardData);
    // 1. мокаем запрос ---> с сервера получим data
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    // 2. Затем с помощью метода callThunk вызываем наш тестовый thunk который не ожидает на вход аргументов
    const result = await thunk.callThunk('1');
    // 3. Опишем ожидание - ожидаем, что вызвался get-запрос
    expect(thunk.api.get).toHaveBeenCalled();
    // ---> ожидаем что asyncThunk выполнился со статусом fulfilled. То есть с backend вернулся адекватный ответ
    expect(result.meta.requestStatus).toBe('fulfilled');
    // ---> проверяем payload и говорим, что ожидаем из asynkThunk payload в виде data - это то, что вернул нам backand.
    expect(result.payload).toEqual(data);
  });

  // запрос выполнился с ошибкой
  // test('error login', async () => {
  //   // 0.
  //   const thunk = new TestAsyncThun(fetchEditableProfileCardData);
  //   // 1. мокаем запрос ---> с сервера получим статус 403
  //   thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
  //   // 2. Затем с помощью метода callThunk вызываем наш тестовый thunk который не ожидает на вход аргументов
  //   const result = await thunk.callThunk();
  //   // 3. Опишем ожидание - статус выполнения asyncThunk должен быть rejected
  //   expect(result.meta.requestStatus).toBe('rejected');
  // });
});
