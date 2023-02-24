import { getLoginState } from 'features/AuthByUsername/model/selectors/selectLoginState/getLoginState';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Text, TextTheme } from 'shared/ui/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';

interface LoginFormProps { className?: string; }

export const LoginForm = memo(
  ({ className }: LoginFormProps) => {
    const { t } = useTranslation('LoginForm');
    const dispatch = useDispatch();
    const {
      username,
      password,
      isLoading,
      error,
    } = useSelector(getLoginState);

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
    );
  },
);
