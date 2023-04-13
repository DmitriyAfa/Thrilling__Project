/* eslint-disable no-unused-vars */
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';

import { Text, TextTheme } from 'shared/ui/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation('Navbar');
  const [isAuthModal, setisAuthModal] = useState(false);
  const dispatch = useDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onCLose = useCallback(() => {
    setisAuthModal(false);
  }, []);

  const authData = useSelector(getUserAuthData);

  const onShowModal = useCallback(() => {
    setisAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAviable = isAdmin || isManager;

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, [className])}>
        <Text
          className={cls.appName}
          title="DDeveloper App"
          theme={TextTheme.INVERTED}
        />
        <AppLink
          to={RoutePaths.article_create}
          theme={AppLinkTheme.SECONDARY}
          className={cls.createBtn}
        >
          {t('Создать статью')}
        </AppLink>
        <Dropdown
          direction="bottom left"
          className={cls.dropdown}
          items={[
            ...(isAdminPanelAviable
              ? [{
                content: t('Админка'),
                href: RoutePaths.admin_panel,
              }]
              : []
            ),
            {
              content: t('Профиль'),
              href: RoutePaths.profile + authData.id,
            },
            {
              content: t('Выйти'),
              onClick: onLogout,
            },
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={classNames(cls.links)}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCLose} />
      )}
    </header>
  );
});
