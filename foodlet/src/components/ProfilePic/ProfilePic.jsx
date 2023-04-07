import React from 'react';

const ProfilePic = () => {
  const { currentUser, isAuthLoaded } = useContext(AuthContext)
  return (
    <div>
      {isAuthLoaded && currentUser.profilePic}
    </div>
  );
};

export default ProfilePic;