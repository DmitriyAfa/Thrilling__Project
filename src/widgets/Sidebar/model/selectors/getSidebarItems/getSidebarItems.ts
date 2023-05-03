import { createSelector } from '@reduxjs/toolkit';

import { SidebarItemType } from '../../types/sidebar';

import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import {
  getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';

// createSelector - мемоизирует значения так как они не будут изменяться
export const getSidebarItems = createSelector(
  // получаем данные о пользователе
  getUserAuthData,
  (userData) => {
    const SidebarItemsList: SidebarItemType[] = [
      {
        path: getRouteMain(),
        Icon: MainIcon,
        text: 'Главная',
      },
      {
        path: getRouteAbout(),
        Icon: AboutIcon,
        text: 'О сайте',
      },
    ];

    // Если пользователь авторизован
    if (userData) {
      SidebarItemsList.push(
        {
          // eslint-disable-next-line no-unsafe-optional-chaining
          path: getRouteProfile(userData?.id),
          Icon: ProfileIcon,
          text: 'Профиль',
          authOnly: true,
        },
        {
          path: getRouteArticles(),
          Icon: ArticleIcon,
          text: 'Статьи',
          authOnly: true,
        },
      );
    }

    return SidebarItemsList;
  },
);