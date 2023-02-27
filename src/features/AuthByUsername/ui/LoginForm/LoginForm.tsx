import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from 'features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from 'features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from 'features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername';
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModelLoader, ReducersList } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Text, TextTheme } from 'shared/ui/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';

export interface LoginFormProps { className?: string; }

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(
  ({ className }: LoginFormProps) => {
    const { t } = useTranslation('LoginForm');
    const dispatch = useDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback((value: string) => {
      dispatch(loginActions.setUserName(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
      dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
      dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
      <DynamicModelLoader
        reducer={initialReducers}
        removeAfterUnmount
      >
        <div className={classNames(cls.LoginForm, [className])}>
          <Text title={t('Форма авторизации')} />
          {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
          <Input
            className={cls.input}
            type="text"
            placeholder={t('Введите username')}
            autofocus
            onChange={onChangeUsername}
            value={username}
          />
          <Input
            className={cls.input}
            type="text"
            placeholder={t('Введите пароль')}
            onChange={onChangePassword}
            value={password}
          />
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.loginBtn}
            onClick={onLoginClick}
            disabled={isLoading}
          >
            {t('Войти')}
          </Button>
        </div>
      </DynamicModelLoader>
    );
  },
);

export default LoginForm;