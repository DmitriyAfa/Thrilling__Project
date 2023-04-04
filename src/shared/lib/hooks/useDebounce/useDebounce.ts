/* eslint-disable no-unused-vars */
/**
 * Debounce - функция которая откладывает вызов другой функции
 * до определенного момента после ее последнего вызова.
 *
 * Другими словами debounce возвращает callback с определенным промежутком после ее последнего вызова.
 * После чего все предыдущие вызовы буду очищены.
 *
 * Такая функция используют, чтобы не бомбардировать сервер кучей запросов.
 */

import { MutableRefObject, useCallback, useRef } from 'react';

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef() as MutableRefObject<any>;

  return useCallback((...args: any[]) => {
    // если в рефтаймер уже соранен какой-то таймаут, то очищаем этот таймаут
    if (timer.current) {
      clearTimeout(timer.current);
    }
    // и создаем новый таймер
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

/**
 * Пока таймер timer очищается callback не будет вызван, но как только очищение
 *  закончиться функция-callback будет вызвана.
 */