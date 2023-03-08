import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>(
  'profile/updateProfileData',
  async (_, thankApi) => {
    // Типизируем thankApi в ThunkConfig
    const { extra, rejectWithValue, getState } = thankApi;

    /*
      Функционал обновления формы на сервере (put-запрос)
     -
     В компонентах для получения state используем хук useSelector,
     а внутри asyncThunk используем getState0.
    */
    const formData = getProfileForm(getState());

    try {
      /*
        Отправим put-запрос - это запрос на обновления данных.
        В качестве тела запроса передаем данные из формы
       */
      const response = await extra.api.put<Profile>('/profile', formData);

      return response.data;
    } catch (err) {
      return rejectWithValue('error');
    }
  },
);