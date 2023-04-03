import { ArticlesSortField } from 'entities/Article';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { SortOrder } from 'shared/types/sort';
import { Select, SelectOptions } from 'shared/ui/Select/Select';
import cls from './ArticleSortSelector.module.scss';

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
  );
});