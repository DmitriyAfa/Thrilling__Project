import { memo, ReactNode, useCallback } from 'react';

import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

import cls from './Tabs.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

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
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const {
    className,
    tabs,
    value,
    direction = 'row',
    onTabClick,
  } = props;

  const clickHandle = useCallback((tab: TabItem) => () => {
    onTabClick(tab);
  }, [onTabClick]);

  return (
    <Flex
      align='start'
      direction={direction}
      gap='8'
      className={classNames(cls.Tabs, [className], {})}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <Card
            key={tab.value}
            className={classNames(cls.tab, [], { [cls.selected]: isSelected })}
            variant={isSelected ? 'light' : 'outline'}
            onClick={clickHandle(tab)}
            border='round'
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});