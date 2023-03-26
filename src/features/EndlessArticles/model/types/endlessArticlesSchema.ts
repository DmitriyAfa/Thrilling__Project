import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface EndlessArticlesSchema extends EntityState<Article> {
  view: ArticleView;
  // pagination; hasMore - флаг который говорит о том, что мы подргузили все статьи или есть еще статьи к подгрузке
  page: number;
  limit?: number;
  hasMore: boolean;

  isLoading?: boolean;
  error?: string;
  /**
   * Избавит от лишних запросов на сервер.
   * Отслеживаем по флагу (который нельзя менять вручную) проинициализирован state или нет
   */
  _inited: boolean;
}