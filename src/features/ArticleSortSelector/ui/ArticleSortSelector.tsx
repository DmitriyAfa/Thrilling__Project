import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ArticleSortSelector.module.scss';

import { ArticlesSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOptions } from '@/shared/ui/deprecated/Select';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticlesSortField;
  order: SortOrder;
  // eslint-disable-next-line no-unused-vars
  onChangeOrder: (newOrder: SortOrder) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeSort: (newSort: ArticlesSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    className,
    sort,
    order,
    onChangeOrder,
    onChangeSort,
  } = props;
  const { t } = useTranslation('article/ArticleSortSelector');

  const orderOptions = useMemo<SelectOptions<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('Возрастанию'),
    },
    {
      value: 'desc',
      content: t('Убыванию'),
    },
  ], [t]);

  const orderFieldOptions = useMemo<SelectOptions<ArticlesSortField>[]>(() => [
    {
      value: ArticlesSortField.CREATED,
      content: t('Дате создания'),
    },
    {
      value: ArticlesSortField.TITLE,
      content: t('Названию'),
    },
    {
      value: ArticlesSortField.VIEWS,
      content: t('Просмотрам'),
    },
  ], [t]);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <div className={classNames(cls.ArticleSortSelectorRedesigned, [className], {})}>
          <VStack gap='8'>
            <Text
              text={t('Сортировать по')}
            />
            <ListBox
              items={orderFieldOptions}
              value={sort}
              onChange={onChangeSort}
            />
            <ListBox
              items={orderOptions}
              value={order}
              onChange={onChangeOrder}
            />
          </VStack>
        </div>
      )}
      off={(
        <div className={classNames(cls.ArticleSortSelector, [className], {})}>
          <Select<ArticlesSortField>
            options={orderFieldOptions}
            label={t('Сортировать по')}
            value={sort}
            onChange={onChangeSort}
          />
          <Select<SortOrder>
            options={orderOptions}
            label={t('По')}
            value={order}
            onChange={onChangeOrder}
            className={cls.order}
          />
        </div>
      )}
    />
  );
});