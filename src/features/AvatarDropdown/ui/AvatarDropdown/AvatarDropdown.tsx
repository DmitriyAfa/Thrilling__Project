import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;

  const { t } = useTranslation('Navbar');
  const dispatch = useAppDispatch();

  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAviable = isAdmin || isManager;

  // Так как этот компонент в Navbar может отрисоваться только если есть authData, то следующее условие является корректным
  if (!authData) {
    return null;
  }

  const items = [
    ...(isAdminPanelAviable
      ? [{
        content: t('Админка'),
        href: getRouteAdmin(),
      }]
      : []
    ),
    {
      content: t('Профиль'),
      href: getRouteProfile(authData.id),
    },
    {
      content: t('Выйти'),
      onClick: onLogout,
    },
  ];

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <Dropdown
          className={classNames('', [className], {})}
          direction='bottom left'
          items={items}
          trigger={<Avatar size={40} src={authData.avatar} />}
        />
      )}
      off={(
        <DropdownDeprecated
          className={classNames('', [className], {})}
          direction='bottom left'
          items={items}
          trigger={<AvatarDeprecated fallbackInverted size={30} src={authData.avatar} />}
        />
      )}
    />
  );
});