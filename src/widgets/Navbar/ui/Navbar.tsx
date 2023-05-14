import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { DeprecatedNavbar } from './DeprecatedNavbar';
import cls from './Navbar.module.scss';

import {
  getUserAuthData,
} from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation('Navbar');
  const [isAuthModal, setisAuthModal] = useState(false);

  const onCLose = useCallback(() => {
    setisAuthModal(false);
  }, []);

  const authData = useSelector(getUserAuthData);

  const onShowModal = useCallback(() => {
    setisAuthModal(true);
  }, []);

  if (authData) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <header className={classNames(cls.NavbarRedesigned, [className])}>
            <HStack gap='16' className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        )}
        off={<DeprecatedNavbar />}
      />
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
