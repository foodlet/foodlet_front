import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({ name, description, ingredients, time, img='' }) => {
  return (
    <div>
      <div className="card" style={{width: "18rem"}}>
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <Link>
            <p className='btn btn-success'>See more</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recipe;