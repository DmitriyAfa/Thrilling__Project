import { profileReducer } from 'entities/Profile';
import { useTranslation } from 'react-i18next';
import { DynamicModelLoader, ReducersList } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <DynamicModelLoader reducer={reducers} key="profile" removeAfterUnmount>
      <div>
        {t('ProfilePage')}
      </div>
    </DynamicModelLoader>
  );
};

export default ProfilePage;
