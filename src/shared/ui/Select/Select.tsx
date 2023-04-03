import { ChangeEvent, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOptions<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOptions<T>[];
  value?: T;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: T) => void;
  readonly?: boolean;
}
// Убрали memo так как обобщенные типы плохо работают с memo
export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    // Можем сделать явное преобразование так как благодаря дженерику получился своего рода type guard который не пропустит лишние значения
    onChange?.(e.target.value as T);
  };

  const optionsList = useMemo(() => (
    options?.map((opt) => (
      <option
        className={cls.option}
        value={opt.value}
        key={opt.value}
      >
        {opt.content}
      </option>
    ))
  ), [options]);

  return (
    <div className={classNames(cls.Select, [className])}>
      {
        label && (
          <span className={cls.label}>
            {`${label}>`}
          </span>
        )
      }
      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
};
