import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from '../../ProfilePic/ProfilePic';
import AuthContext from '../../../contexts/AuthContext';
import { logout } from '../../../stores/AccessTokenStore';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div>
      <Link to='/profile'>
        {currentUser ? <ProfilePic /> :
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYv0uOlC1qkaEARvqS2VK4-TDQPnXmsz7I5w&usqp=CAU'/>
        }
      </Link>
      {currentUser ? 
        <button onClick={() => logout()}>Logout</button> :
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </div>
      }
      <Link>Get recipes</Link>
    </div>
  );
};

export default Navbar;