/* eslint-disable no-unused-vars */
import { memo } from 'react';

import cls from './Text.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

export enum TextTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

// Внутри объекта сопоставим размер шрифта и тега
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    'data-testid': dataTestId = 'Text',
  } = props;

  const Headertag = mapSizeToHeaderTag[size];

  return (
    <div className={classNames(
      '',
      [className, cls[theme], cls[align], cls[size]],
    )}
    >
      {title && <Headertag data-tesid={`${dataTestId}.Header`} className={cls.title}>{title}</Headertag>}
      {text && <p data-tesid={`${dataTestId}.Paragraph`} className={cls.text}>{text}</p>}
    </div>
  );
});
