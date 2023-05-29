import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  // eslint-disable-next-line no-unused-vars
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation('article/ArticleTypeTabs');

  const typeTabs = useMemo<TabItem[]>(() => Object.values(ArticleType)
    .reduce((acc: TabItem[], cur) => ([
      ...acc,
      { value: cur, content: t(cur) },
    ]), []), [t]);

  const onTabClick = useCallback((tab: TabItem) => {
    onChangeType(tab.value as ArticleType);
  }, [onChangeType]);
  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <Tabs
          direction='column'
          className={classNames('', [className], {})}
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
        />
      )}
      off={(
        <TabsDeprecated
          className={classNames('', [className], {})}
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
        />
      )}
    />
  );
});
