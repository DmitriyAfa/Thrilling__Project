import { memo, ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  // eslint-disable-next-line no-unused-vars
  onTabClick: (tab: TabItem) => void;
  className?: string;
}

export const Tabs = memo((props: TabsProps) => {
  const {
    className,
    tabs,
    value,
    onTabClick,
  } = props;

  /**
   * Чтобы правильно сделать обработчик функции onClick у Card воспользуемся механизмом
   * замыкания. Потому что обычно onClick на блоке принимает event в качестве аргумента,
   * а не tab - в нашем.
   * Создаем handle-функцию которая будет обрабатывать нажатие на таб.
   * Воспользуемся механизмом замыкания: в верхнем уровне функции принимает tab,
   * а из функции вернем вызов функции безымяной стрелочной функции в которой
   * вызываем функцию onTabClick с аргументом принятом выше.
   */
  const clickHandle = useCallback((tab: TabItem) => () => {
    onTabClick(tab);
  }, [onTabClick]);

  return (
    <div className={classNames(cls.Tabs, [className], {})}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          className={cls.tab}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});