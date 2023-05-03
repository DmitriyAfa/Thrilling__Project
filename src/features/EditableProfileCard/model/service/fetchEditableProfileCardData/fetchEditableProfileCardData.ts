import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

export const fetchEditableProfileCardData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>(
  'fetchEditableProfileCardData',
  async (profileId, thankApi) => {
    const { extra, rejectWithValue } = thankApi;
    try {
      const response = await extra.api.get<Profile>(`/profile/${profileId}`);

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