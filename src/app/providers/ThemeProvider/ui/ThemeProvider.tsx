import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';

import { useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/theme';
import {
  ThemeContext,
} from '@/shared/lib/context/ThemeContext';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, initialTheme } = props;
  const { theme: defaultTheme } = useJsonSettings();
  const [isThemeInited, setThemeInited] = useState(false);

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || Theme.DARK);
  // Прокидывание темы при инициализации таком образом, возможно это не самая лучшая реализация
  useEffect(() => {
    if (!isThemeInited && defaultTheme) {
      setTheme(defaultTheme);
      setThemeInited(true);
    }
  }, [defaultTheme, isThemeInited]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <div>
      <ThemeContext.Provider value={defaultProps}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};

export default ThemeProvider;
