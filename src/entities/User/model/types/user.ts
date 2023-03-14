export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface UserSchema {
  authData?: User;

  // Защищенные роуты - Подчеркивание говорит о том, что флаг нельзя менять вручную.
  _inited: boolean;
}
