import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Navbar, [className])}>
      <div className={classNames(cls.links)}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={classNames(cls.mainLink)}
          to="/"
        >
          {t('Главная страница')}
        </AppLink>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <AppLink theme={AppLinkTheme.SECONDARY} to="/about">
          {t('О сайте')}
        </AppLink>
      </div>
    </div>
  );
};
