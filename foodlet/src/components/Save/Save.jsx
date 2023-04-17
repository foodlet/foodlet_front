import React from 'react';
import { Link } from 'react-router-dom';

const Save = ({ name, description, id }) => {
  return (
    <div>
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <Link to={`/recipes/${id}`}><p className="btn btn-success">See more</p></Link>
        </div>
      </div>
    </div>
  );
};

export default Save;