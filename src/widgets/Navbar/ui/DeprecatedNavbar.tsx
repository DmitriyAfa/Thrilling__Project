import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './Navbar.module.scss';

import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';

interface DeprecatedNavbarProps {
  className?: string;
}

export const DeprecatedNavbar = memo((props: DeprecatedNavbarProps) => {
  const { t } = useTranslation('Navbar');
  const { className } = props;

  return (
    <header className={classNames(cls.Navbar, [className])}>
      <Text
        className={cls.appName}
        title='DDeveloper App'
        theme={TextTheme.INVERTED}
      />
      <AppLink
        to={getRouteArticleCreate()}
        theme={AppLinkTheme.SECONDARY}
        className={cls.createBtn}
      >
        {t('Создать статью')}
      </AppLink>
      <HStack gap='16' className={cls.actions}>
        <NotificationButton />
        <AvatarDropdown />
      </HStack>
    </header>
  );
});
