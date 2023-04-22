import React from 'react';
import { Link } from 'react-router-dom';

const Save = ({ name, description, id }) => {
  return (
    <div>
      <div className="card" style={{backgroundColor: 'rgb(246, 245, 245)', border: 'none', width:'95vw'}}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <Link to={`/recipes/${id}`}><p className="btn" style={{backgroundColor: '#25A244', color: 'white', padding: '8px 20px'}}>See more</p></Link>
        </div>
      </div>
    </div>
  );
};

export default Save;