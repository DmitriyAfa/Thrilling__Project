import { createSelector } from '@reduxjs/toolkit';

import { SidebarItemType } from '../../types/sidebar';

import { getUserAuthData } from '@/entities/User';
import AboutIconDeprecated from '@/shared/assets/icons/about.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import MainIconDeprecated from '@/shared/assets/icons/main.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile.svg';

import ArticleIcon from '@/shared/assets/icons/article.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';

import {
  getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

// createSelector - мемоизирует значения так как они не будут изменяться
export const getSidebarItems = createSelector(
  // получаем данные о пользователе
  getUserAuthData,
  (userData) => {
    const SidebarItemsList: SidebarItemType[] = [
      {
        path: getRouteMain(),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => MainIcon,
          off: () => MainIconDeprecated,
        }),
        text: 'Главная',
      },
      {
        path: getRouteAbout(),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => AboutIcon,
          off: () => AboutIconDeprecated,
        }),
        text: 'О сайте',
      },
    ];

    // Если пользователь авторизован
    if (userData) {
      SidebarItemsList.push(
        {
          // eslint-disable-next-line no-unsafe-optional-chaining
          path: getRouteProfile(userData?.id),
          Icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ProfileIcon,
            off: () => ProfileIconDeprecated,
          }),
          text: 'Профиль',
          authOnly: true,
        },
        {
          path: getRouteArticles(),
          Icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ArticleIcon,
            off: () => ArticleIconDeprecated,
          }),
          text: 'Статьи',
          authOnly: true,
        },
      );
    }

    return SidebarItemsList;
  },
);