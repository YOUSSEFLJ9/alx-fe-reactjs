import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function UserDetails() {
  const contextData = useContext(UserContext);
    return (
      <div>
        <p>Name: {contextData.name}</p>
        <p>Email: {contextData.email}</p>
      </div>
    );
  }
  
  export default UserDetails;