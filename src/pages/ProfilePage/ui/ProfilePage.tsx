import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/EditableProfileCard';
import { Page } from '@/widgets/Page';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Page data-testid='ProfilePage'>
      <EditableProfileCard id={id} />
    </Page>
  );
};

export default ProfilePage;
