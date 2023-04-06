import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModelLoader, ReducersList } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Text, TextTheme } from 'shared/ui/Text';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(
  ({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation('LoginForm');
    const dispatch = useAppDispatch();
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

    const onLoginClick = useCallback(async () => {
      const result = await dispatch(loginByUsername({ username, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess();
      }
    }, [dispatch, onSuccess, password, username]);

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