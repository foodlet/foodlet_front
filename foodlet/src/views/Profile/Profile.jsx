import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

const Profile = () => {
  const { currentUser, isAuthLoaded } = useContext(AuthContext)
  return (
    <div>
      {isAuthLoaded && 
      <p>hi {currentUser.firstName}</p>
      }
    </div>
  );
};

export default Profile;