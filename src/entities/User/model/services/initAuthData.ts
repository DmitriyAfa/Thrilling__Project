import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

export const initAuthData = createAsyncThunk<
  User,
  void,
  ThunkConfig<string>
>(
  'user/initAuthData',
  async (newJsonSettings, thankApi) => {
    const {
      rejectWithValue, dispatch,
    } = thankApi;

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) {
      return rejectWithValue('');
    }

    try {
      const response = await dispatch(
        getUserDataByIdQuery(userId),
      ).unwrap();

      return response;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return rejectWithValue('');
    }
  },
);