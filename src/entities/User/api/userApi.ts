import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

import { rtkApi } from '@/shared/api/rtkApi';

interface SetJsonSettingsArg {
  userId: string;
  jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
      query: ({ userId, jsonSettings }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          jsonSettings,
        },
      }),
    }),
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

// https://redux-toolkit.js.org/rtk-query/usage/usage-without-react-hooks
export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;
// В реальном проекте помимо userId будет JWT-токен, либо другая схема авторизации36+
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;