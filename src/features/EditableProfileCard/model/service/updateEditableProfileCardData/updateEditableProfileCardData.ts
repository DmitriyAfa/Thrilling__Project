import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { getEditableProfileCardForm } from '../../selectors/getEditableProfileCardForm/getEditableProfileCardForm';
import { ValidateEditableProfileCardErrors } from '../../types/editableProfileCard';
import { validateEditableProfileCardData } from '../validateEditableProfileCardData/validateEditableProfileCardData';
/*
  ThunkConfig<ValidateEditableProfileCardErrors[]>
  В ThunkConfig дженерик который отвечает за ошибку (rejectWithValue) ожидает тип ValidateEditableProfileCardErrors[]
*/
export const updateEditableProfileCardData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateEditableProfileCardErrors[]>
>(
  'updateEditableProfileCardData',
  async (_, thankApi) => {
    // Типизируем thankApi в ThunkConfig
    const { extra, rejectWithValue, getState } = thankApi;

    /*
      Функционал обновления формы на сервере (put-запрос)
     -
     В компонентах для получения state используем хук useSelector,
     а внутри asyncThunk используем getState0.
    */
    const formData = getEditableProfileCardForm(getState());

    // Валидация
    const errors = validateEditableProfileCardData(formData);

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
      const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData);

      // Если сервер не вернул data, пробросим ошибку.
      if (!response.data) {
        throw new Error(); // ---> вызовет return rejectWithValue([ValidateEditableProfileCardErrors.SERVER_ERROR]);
      }

      return response.data;
    } catch (err) {
      // Валидация
      return rejectWithValue([ValidateEditableProfileCardErrors.SERVER_ERROR]);
    }
  },
);