import {
  createContext,
  ReactNode,
  useRef,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';

/*
  *оптимизация
  Оптимизируем подгрузку библиотек для анимации, сделаем их ленивыми.
  Библиотеки не будут подгружаться в основной бандл. Он будут подгружаться только
  по мере необходимости (используем в Drawer)
 */

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;
  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

/*
импорт вида import работает внутри компонентов и дает возможность асинхронной загрузки
-
Обе библиотеки зависят друг от друга, поэтому будем загружать обе библиотеки асинхронно
*/
const getAsyncAnimationModules = async () => Promise.all([
  import('@react-spring/web'),
  import('@use-gesture/react'),
]);

// хук useAnimationLibs будет возвращать данные контекста AnimationContext
// Скастуем результат хука как AnimationContextPayload. Это сообщит TS-у, что хук вернет все поля AnimationContextPayload в обязательном порядке. Это позволит не перепроверять на undefined то, что возвращает хук.
export const useAnimationLibs = () => useContext(AnimationContext) as Required<AnimationContextPayload>;

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  /*
    В рефы будем складывать библиотеки. Рефы нужны чтобы от рендера к рендеру у нас
    был доступ к значениям, но при этом не было лишних перерисовок.
  */
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();
  // - false - момемнт когда мы еще не начали подгружать библиотеки
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAsyncAnimationModules().then(([Spring, Gesture]) => {
      SpringRef.current = Spring;
      GestureRef.current = Gesture;
      setIsLoaded(true);
    });
  }, []);

  const value = useMemo(() => ({
    Spring: SpringRef.current,
    Gesture: GestureRef.current,
    isLoaded,
  }), [isLoaded]);

  return (
    <AnimationContext.Provider
      value={value}
    >
      {children}
    </AnimationContext.Provider>
  );
};