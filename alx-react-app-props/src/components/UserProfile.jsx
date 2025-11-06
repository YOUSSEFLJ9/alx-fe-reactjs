import { useContext } from 'react';
import UserInfo from './UserInfo';
import { UserContext } from './UserContext';


function ProfilePage() {
  useContext(UserContext);
  return <UserInfo/>;
}

export default ProfilePage;