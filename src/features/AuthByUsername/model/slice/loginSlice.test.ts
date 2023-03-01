import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: 'Richard' };
    expect(loginReducer(
      state as LoginSchema,
      loginActions.setUserName('Snow'),
    )).toStrictEqual({ username: 'Snow' });
  });
  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' };
    expect(loginReducer(
      state as LoginSchema,
      loginActions.setPassword('567'),
    )).toStrictEqual({ password: '567' });
  });
});
