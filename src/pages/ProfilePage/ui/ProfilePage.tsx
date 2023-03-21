import { EditableProfileCard } from 'features/EditableProfileCard';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <EditableProfileCard id={id} />
  );
};

export default ProfilePage;
