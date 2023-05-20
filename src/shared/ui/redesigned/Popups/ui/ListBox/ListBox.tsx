import { Listbox as HListBox } from '@headlessui/react';
import {
  Fragment, ReactNode, memo,
} from 'react';

import { Button } from '../../../Button';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

import cls from './ListBox.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

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

  const optionsClasses = [direction && mapDirectionClass[direction], popupCls.menu];

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
                      [popupCls.active]: active,
                      [popupCls.disabled]: item.disabled,
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