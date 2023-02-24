import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  { rejectValue: string }
>(
  'login/loginByUsername',
  async ({ username, password }, thunkApi) => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });
      // Если с сервера пришел пустой ответ, то это ошибка
      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      thunkApi.dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkApi.rejectWithValue('error');
    }
  },
);