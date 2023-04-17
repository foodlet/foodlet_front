import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from '../../ProfilePic/ProfilePic';
import AuthContext from '../../../contexts/AuthContext';
import { logout } from '../../../stores/AccessTokenStore';
import './Navbar.css'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  const handleClick = (e) => {
    console.log(e.target.classList)
    if(e.target.classList.includes('clicked-link')) {
      e.target.classList.remove('clicked-link')
    } else {
      e.target.classList.add('clicked-link')
    }
  }

  return (
    <div className='Navbar sticky-bottom'>
      {currentUser ? 
        <i className="fa-solid fa-right-from-bracket fa-lg" onClick={() => logout()}></i> :
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </div>
      }
      <Link to='/feed'><i class="fa-solid fa-house fa-lg"></i></Link>
      <Link to='/get-recipes'><i className="fa-solid fa-magnifying-glass fa-lg"></i></Link>
      <Link to='/create-recipe'><i className="fa-regular fa-square-plus fa-lg" onClick={handleClick}></i></Link>
      <Link to='/profile'>
        {currentUser ? <ProfilePic /> :
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYv0uOlC1qkaEARvqS2VK4-TDQPnXmsz7I5w&usqp=CAU'/>
        }
      </Link>
    </div>
  );
};

export default Navbar;