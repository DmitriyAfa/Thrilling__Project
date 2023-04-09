import {
  Fragment, ReactNode, memo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import { Listbox as HListBox } from '@headlessui/react';
import cls from './ListBox.module.scss';
import { Button } from '../Button';
import { Text } from '../Text';
import { HStack } from '../Stack';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

type DropdownDirection = 'top' | 'bottom';

interface ListBoxProps {
  className?: string;
  items?: ListBoxItem[];
  value?: string;
  defaultValue?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export const ListBox = memo((props: ListBoxProps) => {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction,
    label,
  } = props;

  const optionsClasses = [direction && cls[direction]];

  return (
    <HStack gap="4">
      {label && (
        <span
          className={classNames('', [], { [cls.disabled]: readonly })}
        >
          {`${label}>`}
        </span>
      )}
      <HListBox
        value={value}
        onChange={onChange}
        as="div"
        className={classNames(cls.ListBox, [className])}
        disabled={readonly}
      >
        <HListBox.Button
          disabled={readonly}
          className={cls.trigger}
        >
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              as={Fragment}
              disabled={item.disabled}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.item,
                    [],
                    {
                      [cls.active]: active,
                      [cls.disabled]: item.disabled,
                    },
                  )}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
});