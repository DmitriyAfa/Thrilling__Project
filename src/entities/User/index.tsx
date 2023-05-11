export { useJsonSettings } from './model/selectors/jsonSettings';

export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { isUserAdmin, isUserManager, getUserRoles } from './model/selectors/roleSelectors';

export { userReducer, userActions } from './model/slice/userSlice';

export type { UserSchema, User } from './model/types/user';

export { UserRole } from './model/types/user';

export { saveJsonSettings } from './model/services/saveJsonSettings';