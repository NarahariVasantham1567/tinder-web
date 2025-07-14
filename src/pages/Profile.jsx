import { useSelector } from 'react-redux';
import EditProfile from '../components/EditProfile';

export default function ProfilePage() {
  const user = useSelector((store) => store.user);

  return <div>{user && <EditProfile user={user} />}</div>;
}
