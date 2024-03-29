/* eslint-disable no-unused-vars */
import { User } from '@/entities/User';

export enum ArticlesSortField {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED = 'createdAt'
}

export enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT'
}

export enum ArticleView {
  BIG = 'BIG',
  SMALL = 'SMALL',
}

// Блок с общими типами статей. Создан, чтобы не дублировать общий код для каждого блока
export interface ArticleBLockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBLock extends ArticleBLockBase {
  // Явно укажим тип для автокомплита
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleImageBLock extends ArticleBLockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title?: string;
}

export interface ArticleTextBLock extends ArticleBLockBase {
  type: ArticleBlockType.TEXT;
  paragraphs: string[];
  title?: string;
}

// Объеденяющий блок
export type ArticleBLock = ArticleCodeBLock | ArticleImageBLock | ArticleTextBLock;

export enum ArticleType {
  ALL = 'ALL',
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS',
}

export interface Article {
  id: string;
  title: string;
  user: User;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBLock[];
}