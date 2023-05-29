import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency } from '../../model/types/currency';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

// Функционал валют

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {
    className,
    value,
    onChange,
    readonly,
  } = props;
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  const listProps = {
    className: classNames('', [className]),
    value,
    items: options,
    onChange: onChangeHandler,
    defaultValue: t('Укажите валюту'),
    readonly,
    direction: 'top right' as const,
    label: t('Укажите валюту'),
  };

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <ListBox
          {...listProps}
        />
      )}
      off={(
        <ListBoxDeprecated
          {...listProps}
        />
      )}
    />
  );
});
