import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

const ProfilePic = () => {
  const { currentUser, isAuthLoaded } = useContext(AuthContext)
  return (
    <div>
      {isAuthLoaded && <img src={currentUser.profilePic}/>}
    </div>
  );
};

export default ProfilePic;