/* eslint-disable arrow-body-style */
import { Listbox as HListBox } from '@headlessui/react';
import {
  Fragment, ReactNode, useMemo,
} from 'react';

import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

import cls from './ListBox.module.scss';

import ArrowIcon from '@/shared/assets/Icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

// eslint-disable-next-line no-unused-vars
export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  className?: string;
  items?: ListBoxItem<T>[];
  value?: T;
  defaultValue?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
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

  const optionsClasses = [direction && mapDirectionClass[direction], popupCls.menu];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item?.value === value);
  }, [items, value]);

  return (
    <HStack gap='4'>
      {label && (
        <span
          className={classNames('', optionsClasses)}
        >
          {`${label}>`}
        </span>
      )}
      <HListBox
        value={value}
        onChange={onChange}
        as='div'
        className={classNames('', [className, popupCls.popup])}
        disabled={readonly}
      >
        <HListBox.Button
          disabled={readonly}
          className={cls.trigger}
        >
          <Button
            variant='filled'
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
          >
            {selectedItem?.content ?? defaultValue}
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
                      [popupCls.active]: active,
                      [popupCls.disabled]: item.disabled,
                      [popupCls.selected]: selected,
                    },
                  )}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}