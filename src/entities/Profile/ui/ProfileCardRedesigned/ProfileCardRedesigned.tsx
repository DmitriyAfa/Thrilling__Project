import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('Profile');
  return (
    <HStack justify='center' max>
      <Text
        variant='error'
        title={t('Произошла ошибка при загрузке профиля')}
        text={t('Попробуйте обновить страницу')}
        align='center'
      />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => (
  <Card padding='24' max>
    <VStack gap='32' max>
      <HStack justify='center' max>
        <Skeleton border='100%' width={128} height={128} />
      </HStack>
      <HStack gap='32' max>
        <VStack gap='16' max>
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
        </VStack>
        <VStack gap='16' max>
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
          <Skeleton width='100%' height={38} />
        </VStack>
      </HStack>
    </VStack>
  </Card>
);

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onCnahngeFirstname,
    onCnahngeLastname,
    onCnahngeAge,
    onCnahngeCity,
    onCnahngeUsername,
    onCnahngeAvatar,
    onCnahngeCurrency,
    onCnahngeCountry,
  } = props;

  const { t } = useTranslation('Profile');

  return (
    <Card padding='24' max className={className}>
      <VStack gap='32'>
        {data?.avatar && (
          <HStack
            justify='center'
            max
          >
            <Avatar
              src={data?.avatar}
              size={128}
            />
          </HStack>
        )}
        <HStack gap='24' max>
          <VStack gap='16' max>
            <Input
              value={data?.first}
              label={t('Ваше имя')}
              onChange={onCnahngeFirstname}
              readonly={readonly}
              data-testid='ProfileCard.Firstname'
            />
            <Input
              value={data?.lastname}
              label={t('Ваша фамилия')}
              onChange={onCnahngeLastname}
              readonly={readonly}
              data-testid='ProfileCard.Lastname'
            />
            <Input
              type='number'
              value={data?.age}
              label={t('Ваш возраст')}
              onChange={onCnahngeAge}
              readonly={readonly}
            />
            <Input
              value={data?.city}
              label={t('Ваш город')}
              onChange={onCnahngeCity}
              readonly={readonly}
            />
          </VStack>
          <VStack gap='16' max>
            <Input
              value={data?.username}
              label={t('Имя пользователя')}
              onChange={onCnahngeUsername}
              readonly={readonly}
            />
            <Input
              value={data?.avatar}
              label={t('Ссылка на аватар')}
              onChange={onCnahngeAvatar}
              readonly={readonly}
            />
            <CurrencySelect
              value={data?.currency}
              onChange={onCnahngeCurrency}
              readonly={readonly}
            />
            <CountrySelect
              value={data?.country}
              onChange={onCnahngeCountry}
              readonly={readonly}
            />
          </VStack>
        </HStack>
      </VStack>

    </Card>
  );
});