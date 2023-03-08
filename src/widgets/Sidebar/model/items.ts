import { SVGProps, VFC } from 'react';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: VFC<SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePaths.main,
    Icon: MainIcon,
    text: 'Главная',
  },
  {
    path: RoutePaths.about,
    Icon: AboutIcon,
    text: 'О сайте',
  },
  {
    path: RoutePaths.profile,
    Icon: ProfileIcon,
    text: 'Профиль',
    authOnly: true,
  },
];