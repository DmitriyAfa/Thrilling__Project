import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Country } from '../../model/types/country';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

// Функционал обновления страны

const options = [
  { value: Country.BELARUS, content: Country.BELARUS },
  { value: Country.CHINA, content: Country.CHINA },
  { value: Country.RUSSIA, content: Country.RUSSIA },
  { value: Country.USA, content: Country.USA },
];

interface CountrySelectProps {
  className?: string;
  value?: Country;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

export const CountrySelect = memo((props: CountrySelectProps) => {
  const {
    className,
    value,
    onChange,
    readonly,
  } = props;
  const { t } = useTranslation('Profile');

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  const listProps = {
    className: classNames('', [className]),
    onChange: onChangeHandler,
    value,
    defaultValue: t('Выберите страну'),
    items: options,
    readonly,
    direction: 'top right' as const,
    label: t('Выберите страну'),
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
