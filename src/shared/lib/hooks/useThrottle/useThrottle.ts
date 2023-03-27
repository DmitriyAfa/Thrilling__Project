/* eslint-disable no-unused-vars */
/**
 * Чтобы избежать лишней нагрузки при обновлении данных с высокой частотой
 * есть такой механизм как троттлинг.
 * Троттлинг функции означает, что функция вызывается не более одного раза в указанный
 * период времени, период троттлинга.
 */

import { useCallback, useRef } from 'react';

export function useTrottle(callback: (...args: any[]) => void, delay: number) {
  // Троттлинг реф - хранит булево значение, которое показывает можно ли вызвать сейчас callback
  const throttleRef = useRef(false);
  return useCallback((...args: any[]) => {
    if (!throttleRef.current) {
      // 1. вызывали callback
      callback(...args);
      // 2. изменили значение на true
      throttleRef.current = true;
      // 3. Все дальнейшие вызовы callback буду проигнорированны до тех пор пока
      // не вернем значение троттл рефа в false
      setTimeout(() => {
        throttleRef.current = false;
      }, delay);
    }
  }, [callback, delay]);
}