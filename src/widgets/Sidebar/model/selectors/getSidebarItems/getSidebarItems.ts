import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';

import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';
import { SidebarItemType } from '../../types/sidebar';

// createSelector - мемоизирует значения так как они не будут изменяться
export const getSidebarItems = createSelector(
  // получаем данные о пользователе
  getUserAuthData,
  (userData) => {
    const SidebarItemsList: SidebarItemType[] = [
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
    ];

    // Если пользователь авторизован
    if (userData) {
      SidebarItemsList.push(
        {
          // eslint-disable-next-line no-unsafe-optional-chaining
          path: RoutePaths.profile + userData?.id,
          Icon: ProfileIcon,
          text: 'Профиль',
          authOnly: true,
        },
        {
          path: RoutePaths.articles,
          Icon: ArticleIcon,
          text: 'Статьи',
          authOnly: true,
        },
      );
    }

    return SidebarItemsList;
  },
);