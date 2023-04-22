import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
      {/* <img src='https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000'/> */}
      <div className='container-browser'>
        {/* <div>
          <Link to='/signup' className='home-signup'>Create an account</Link>
        </div> */}
        <h1>foodlet.</h1>
        <h3>Open fridge. Search. Cook. Repeat</h3>
        <div>
          <Link to='/get-recipes' className='home-start-browsing btn'>Start browsing</Link>
          <Link to='/signup' className='home-signup btn' style={{backgroundColor:'white', textDecoration:'none'}}>Create an account</Link>
        </div>
        {/* <button className='btn'>Learn more</button>s */}
      </div>
    </div>
  );
};

export default Home;