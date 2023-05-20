import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SidebarItemType } from '../../model/types/sidebar';

import depCls from './SidebarItem.deprecated.module.scss';
import rdgCls from './SidebarItem.redesigned.module.scss';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  //  Защищенные роуты
  const isAuth = useSelector(getUserAuthData);
  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <AppLink
          className={classNames(rdgCls.itemRedesigned, [], { [rdgCls.collapsedRedesigned]: collapsed })}
          to={item.path}
          activeClassName={rdgCls.active}
        >
          <Icon Svg={item.Icon} />
          <span className={rdgCls.link}>{t(item.text)}</span>
        </AppLink>
      )}
      off={(
        <AppLinkDeprecated
          className={classNames(depCls.item, [], { [depCls.collapsed]: collapsed })}
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
        >
          <item.Icon className={depCls.icon} />
          <span className={depCls.link}>{t(item.text)}</span>
        </AppLinkDeprecated>
      )}
    />
  );
});
