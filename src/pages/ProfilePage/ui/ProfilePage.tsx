import { EditableProfileCard } from 'features/EditableProfileCard';
import { useParams } from 'react-router-dom';
import { Page } from 'shared/ui/Page/Page';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Page>
      <EditableProfileCard id={id} />
    </Page>
  );
};

export default ProfilePage;
