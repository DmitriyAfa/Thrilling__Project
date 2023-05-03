import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollRestoration = (state: StateSchema) => state.scrollRestoration.scroll;
// Возвращаем не весь объект с ключами и значениями, а участок скрола по пути
export const getScrollRestorationByPath = createSelector(
  getScrollRestoration,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);