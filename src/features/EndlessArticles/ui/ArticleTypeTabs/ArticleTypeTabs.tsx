import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}
// лучше сделать полностью отдельной фичой
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
    <Tabs
      className={classNames('', [className], {})}
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
    />
  );
});

// const typeTabs = useMemo<TabItem[]>(() => [
//   {
//     value: ArticleType.ALL,
//     content: t('Все'),
//   },
//   {
//     value: ArticleType.IT,
//     content: t('Айти'),
//   },
//   {
//     value: ArticleType.SCIENCE,
//     content: t('Наука'),
//   },
//   {
//     value: ArticleType.ECONOMICS,
//     content: t('Экономика'),
//   },
// ], [t]);