import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation('features/UiDesignSwitcher');
  const dispatch = useAppDispatch();
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);

  const items = [
    {
      content: t('Новый'),
      value: 'new',
    },
    {
      content: t('Старый'),
      value: 'old',
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(updateFeatureFlag({
        userId: authData.id,
        newFeatures: {
          isAppRedesigned: value === 'new',
        },
      })).unwrap();
      setIsLoading(false);
    }
  };

  return (
    <HStack gap='16'>
      <Text text={t('Вариант интерфейса')} />
      {
        isLoading
          ? (
            <Skeleton width={100} height={40} />
          )
          : (
            <ListBox
              className={className}
              value={isAppRedesigned ? 'new' : 'old'}
              items={items}
              onChange={onChange}
            />
          )
      }

    </HStack>
  );
});