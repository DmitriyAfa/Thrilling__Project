import { memo } from 'react';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

import { ArticlesFilters } from '@/widgets/ArticlesFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;
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
    <ArticlesFilters
      className={className}
      order={order}
      sort={sort}
      onChangeOrder={onChangeOrder}
      onChangeSort={onChangeSort}
      onChangeSearch={onChangeSearch}
      search={search}
      onChangeType={onChangeType}
      type={type}
    />
  );
});