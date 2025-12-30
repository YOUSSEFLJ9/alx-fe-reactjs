import { Routes, Route, Link } from 'react-router-dom';
import ProfileDetails from './Profile/ProfileDetails';
import ProfileSettings from './Profile/ProfileSettings';

export default function Profile() {
  return (
    <div>
      <h2>Profile</h2>

      <nav>
        <Link to="details">Details</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}
