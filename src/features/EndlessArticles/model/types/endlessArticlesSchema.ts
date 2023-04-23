import { EntityState } from '@reduxjs/toolkit';
import {
  Article,
  ArticlesSortField,
  ArticleType,
  ArticleView,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

export interface EndlessArticlesSchema extends EntityState<Article> {
  // pagination; hasMore - флаг который говорит о том, что мы подргузили все статьи или есть еще статьи к подгрузке
  page: number;
  limit: number;
  hasMore: boolean;

  isLoading?: boolean;
  error?: string;
  // filters
  view: ArticleView;
  // order - порядок сортировки. asc- прямой, desc - обратный
  order: SortOrder;
  sort: ArticlesSortField;
  search: string;
  type: ArticleType;
  /**
   * Избавит от лишних запросов на сервер.
   * Отслеживаем по флагу (который нельзя менять вручную) проинициализирован state или нет
   */
  _inited: boolean;
}