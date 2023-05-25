import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';

import cls from './ArticleFilters.module.scss';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';

interface ArticleFiltersProps {
  className?: string;
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation('article/ArticleFilters');
  const {
    order,
    sort,
    onChangeOrder,
    onChangeSort,
    onChangeSearch,
    search,
    onChangeType,
    type,
  } = useArticleFilters();

  return (
    <div className={classNames(cls.ArticleFilters, [className], {})}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ViewSelectorContainer />
      </div>
      <Card className={cls.search}>
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t('Поиск')}
        />
      </Card>
      <ArticleTypeTabs
        className={cls.tabs}
        onChangeType={onChangeType}
        value={type}
      />
    </div>
  );
});