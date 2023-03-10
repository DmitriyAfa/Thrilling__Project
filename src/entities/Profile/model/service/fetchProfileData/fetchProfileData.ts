import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>(
  'profile/fetchProfileData',
  async (_, thankApi) => {
    const { extra, rejectWithValue } = thankApi;
    try {
      const response = await extra.api.get<Profile>('/profile');

      // Если с сервера не вернулись данные, тогда пробрасываем ошибку
      if (!response) {
        throw new Error();
      }

      return response.data;
    } catch (err) {
      return rejectWithValue('error');
    }
  },
);