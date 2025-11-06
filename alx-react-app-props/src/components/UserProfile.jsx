import { useContext } from 'react';
import UserInfo from './UserInfo';


function ProfilePage() {
  useContext(UserContext);
  return <UserInfo/>;
}

export default ProfilePage;