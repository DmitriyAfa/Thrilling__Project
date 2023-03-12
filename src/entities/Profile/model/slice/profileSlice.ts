import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from '../service/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../service/updateProfileData/updateProfileData';
import { Profile, ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
  form: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    /*
      Функционал редактирования формы.
      -
      В cancelEdit будем возвращать изначальные данные профиля (которые получили с сервера).
      -
      Используется в ProfilePageHeader
    */
    cancelEdit: (state) => {
      state.readonly = true;
      state.form = state.data;
      // Валидация - очищаем ошибки валидации при отмене редактирования профиля
      state.validateErrors = undefined;
    },

    /*
      Функционал редактирования формы.
      -
      В updateProfile будем изменять поле form, которое предназначено для
      редактировани пользователем.
      -
      Используется в ...
    */
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        // обнуляем ошибку если она вдруг была
        // Валидация - при получении профиля, обновляем ошибки валидаций
        state.validateErrors = undefined;
        // ___  Валидация ___
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        /*
         Функционал редактирования формы.
         Поле data будет неизменяемым. Получем его с сервера и сохраняем без дальнейших изменений.
         -
         В поле форм тоже сохраняем данные с сервера. Так мы сможем узнать
         какие данные о профиле хранятся на сервере, чтобы их отредактировать.
         -
         Происходит некоторое дублирование данных в state. Этого можно было
         бы избежать, но тогда при отмене изменений пришлось бы отправлять еще один
         запрос за свежими данными профиля на сервер.
        */
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // - Функционал обновления формы на сервере (put-запрос)
      .addCase(updateProfileData.pending, (state) => {
        // обнуляем ошибку если она вдруг была
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        /*
          С сервера получаем обновленный профиль и его же записываем в state
         */
        state.data = action.payload;
        state.form = action.payload;

        // После обновления данных (put-запрос), запрещаем редактирование через readonly
        state.readonly = true;

        // Валидация
        state.validateErrors = undefined;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        /*
        В случае ошибки тоже самое
        ошибку записываем в state, а isLoading изменяем на false
         */
        state.isLoading = false;
        state.validateErrors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
