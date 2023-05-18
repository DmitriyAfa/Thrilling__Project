import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

// deprecated styles
import depCls from './Sidebar.deprecated.module.scss';
// redesigned styles
import rdgCls from './Sidebar.redesigned.module.scss';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrowIcon from '@/shared/assets/Icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = sidebarItemsList.map((item) => (
    <SidebarItem
      item={item}
      collapsed={collapsed}
      key={item.path}
    />
  ), [collapsed]);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      // redesigned
      on={(
        <aside
          data-testid='sidebar'
          className={classNames(rdgCls.SidebarRedesigned, [className], {
            [rdgCls.collapsedRedesigned]: collapsed,
          })}
        >
          <AppLogo size={collapsed ? 30 : 50} className={rdgCls.appLogo} />
          <VStack
            role='navigation'
            gap='8'
            className={rdgCls.items}
          >
            {itemsList}
          </VStack>
          <Icon
            data-testid='sidebar-toggle'
            onClick={onToggle}
            className={rdgCls.collapseBtn}
            Svg={ArrowIcon}
            clickable
          />
          <div className={rdgCls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={rdgCls.lang} />
          </div>
        </aside>
      )}
      // deprecated
      off={(
        <aside
          data-testid='sidebar'
          className={classNames(depCls.Sidebar, [className], {
            [depCls.collapsed]: collapsed,
          })}
        >
          <Button
            // eslint-disable-next-line i18next/no-literal-string
            data-testid='sidebar-toggle'
            type='button'
            onClick={onToggle}
            className={depCls.collapseBtn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            square
            size={ButtonSize.L}
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack
            role='navigation'
            gap='8'
            className={depCls.items}
          >
            {itemsList}
          </VStack>

          <div className={depCls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={depCls.lang} />
          </div>
        </aside>
      )}
    />
  );
});
