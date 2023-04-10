import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

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

  return (
    <ListBox
      className={classNames('', [className])}
      onChange={onChangeHandler}
      value={value}
      defaultValue={t('Выберите страну')}
      items={options}
      readonly={readonly}
      direction="top right"
      label={t('Выберите страну')}
    />
  );
});
