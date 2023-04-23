import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';

export interface ArticleCommentsListSchema extends EntityState<Comment> {
  isLoading?: boolean;
  error?: string;
  ids: string[];
}