/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';

import { Profile } from '../../model/types/profile';
import {
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ToggleFeatures } from '@/shared/lib/features';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  // Колбэки не обязательны, чтобы в storybook небыло необходимости передавать множество колбэков
  // Так же в теории карточка может быть не изменяема
  onCnahngeFirstname?: (value?: string) => void;
  onCnahngeLastname?: (value?: string) => void;
  onCnahngeAge?: (value?: string) => void;
  onCnahngeCity?: (value?: string) => void;
  onCnahngeUsername?: (value?: string) => void;
  onCnahngeAvatar?: (value?: string) => void;
  onCnahngeCurrency?: (currency?: Currency) => void;
  onCnahngeCountry?: (country?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    error,
    isLoading,
  } = props;

  const { t } = useTranslation('Profile');

  if (isLoading) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ProfileCardRedesignedSkeleton />}
        off={<ProfileCardDeprecatedLoader />}
      />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ProfileCardRedesignedError />}
        off={<ProfileCardDeprecatedError />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  );
};
