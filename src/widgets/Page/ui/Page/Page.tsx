/* eslint-disable function-paren-newline */
import {
  MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import cls from './Page.module.scss';

import { StateSchema } from '@/app/providers/StoreProvider';
import { scrollRestorationActions, getScrollRestorationByPath } from '@/features/ScrollRestoration';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UseEndlessScroll } from '@/shared/lib/hooks/useEndlessScroll/useEndlessScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useTrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';

interface PageProps extends TestProps {
  children: ReactNode;
  className?: string;
  onScrollEnd?: () => void;
}

export const Page = (props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector(
    (state: StateSchema) => getScrollRestorationByPath(state, pathname),
  );
  UseEndlessScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });
  // Сохранение скролла
  const onScroll = useTrottle(
    (e: UIEvent<HTMLDivElement>) => {
      dispatch(scrollRestorationActions.setScrtollPosition({
        path: pathname,
        position: e.currentTarget.scrollTop,
      }));
    }, 500);

  /**
   * Восстановление скролла после перехода с одной страницы на другую
   * Отслеживаем событие onScroll на wrapperRef
   */
  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const toggledClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.PageRedesigned,
    off: () => cls.Page,
  });

  return (
    <main
      ref={wrapperRef}
      className={classNames(toggledClass, [className], {})}
      onScroll={onScroll}
      // eslint-disable-next-line react/destructuring-assignment
      data-testid={props['data-testid'] ?? 'Page'}
    >
      {children}
      {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
    </main>
  );
};