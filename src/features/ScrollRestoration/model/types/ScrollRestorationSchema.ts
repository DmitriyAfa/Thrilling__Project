// <Адрес страницы, позиция скролла>
export type ScrtollSchema = Record<string, number>;

export interface ScrollRestorationSchema {
  scroll: ScrtollSchema;
}