import { createAsyncThunk } from '@reduxjs/toolkit';

import { setJsonSettingsMutation } from '../../api/userApi';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { JsonSettings } from '../types/jsonSettings';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>(
  'user/saveJsonSettings',
  async (newJsonSettings, thankApi) => {
    const {
      rejectWithValue, getState, dispatch,
    } = thankApi;
    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
      return rejectWithValue('');
    }

    try {
      const response = await dispatch(setJsonSettingsMutation({
        userId: userData.id,
        jsonSettings: {
          ...currentSettings,
          ...newJsonSettings,
        },
      })).unwrap();

      if (!response.jsonSettings) {
        return rejectWithValue('');
      }

      return response.jsonSettings;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return rejectWithValue('');
    }
  },
);