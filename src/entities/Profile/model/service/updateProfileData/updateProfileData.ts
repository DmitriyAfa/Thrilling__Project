import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile, ValidateProfileErrors } from '../../types/profile';
import { validateProfileData } from '../validateProfile/validateProfile';

/*
  ThunkConfig<ValidateProfileErrors[]>
  В ThunkConfig дженерик который отвечает за ошибку (rejectWithValue) ожидает тип ValidateProfileErrors[]
*/
export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileErrors[]>
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

    // Валидация
    const errors = validateProfileData(formData);

    /*
      Делает условие, если в массиве с ошибками есть хотя бы один элемент, тогда
      завершаем ввыполнение updateProfileData с rejectWithValue куда передаем
      ошибки
     */

    if (errors.length) {
      return rejectWithValue(errors);
    }
    // --- Валидация ---

    try {
      /*
        Отправим put-запрос - это запрос на обновления данных.
        В качестве тела запроса передаем данные из формы
       */
      const response = await extra.api.put<Profile>('/profile', formData);

      // Если сервер не вернул data, пробросим ошибку.
      if (!response.data) {
        throw new Error(); // ---> вызовет return rejectWithValue([ValidateProfileErrors.SERVER_ERROR]);
      }

      return response.data;
    } catch (err) {
      // Валидация
      return rejectWithValue([ValidateProfileErrors.SERVER_ERROR]);
    }
  },
);