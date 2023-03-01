import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicModelLoader, ReducersList } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const dipatch = useAppDispatch();
  useEffect(() => {
    dipatch(fetchProfileData());
  }, [dipatch]);

  return (
    <DynamicModelLoader reducer={reducers} key="profile" removeAfterUnmount>
      <div>
        <ProfileCard />
      </div>
    </DynamicModelLoader>
  );
};

export default ProfilePage;
