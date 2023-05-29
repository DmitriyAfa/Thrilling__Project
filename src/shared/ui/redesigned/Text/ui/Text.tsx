/* eslint-disable no-unused-vars */
import { memo } from 'react';

import cls from './Text.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
  s: 'size_s',
  m: 'size_m',
  l: 'size_l',
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    variant = 'primary',
    align = 'left',
    size = 'm',
    bold = false,
    'data-testid': dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];
  const sizeClass = mapSizeToClass[size];

  const additionalClasses = [className, cls[variant], cls[align], sizeClass];

  return (
    <div className={classNames(
      cls.Text,
      additionalClasses,
      { [cls.bold]: bold },
    )}
    >
      {title && <HeaderTag data-tesid={`${dataTestId}.Header`} className={cls.title}>{title}</HeaderTag>}
      {text && <p data-tesid={`${dataTestId}.Paragraph`} className={cls.text}>{text}</p>}
    </div>
  );
});
