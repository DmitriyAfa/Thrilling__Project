import { useEffect } from 'react';

export function useInitialEffect(callback: () => void) {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      callback();
    }
    // Хук должен отрабатывать единожды при мантировании компонента
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}