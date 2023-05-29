/* eslint-disable no-unused-vars */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ArticlesFilters.module.scss';

import { ArticleType, ArticlesSortField } from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticlesSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticlesSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    sort,
    order,
    type,
    search,
    onChangeSearch,
    onChangeOrder,
    onChangeSort,
    onChangeType,
  } = props;
  const { t } = useTranslation();

  return (
    <Card
      padding='24'
      className={classNames(cls.ArticlesFilters, [className], {})}
    >
      <VStack gap='32'>
        <Input
          onChange={onChangeSearch}
          value={search}
          size='s'
          placeholder={t('Поиск')}
          addonLeft={<SearchIcon />}
        />
        <ArticleTypeTabs
          className={cls.tabs}
          onChangeType={onChangeType}
          value={type}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});