import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createDbSave, createExternalSave, deleteDbSave, deleteExternalSave } from '../../../services/SaveService';
import { deleteRecipe } from '../../../services/RecipeService';

const Recipe = ({ name, description, ingredients, time, img='', id, mine=false }) => {
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(null)
 
  const handleClick = useCallback(() => {
    setSaved(prevState => !prevState)
  }, []);

  const handleDelete = id => {
    deleteRecipe(id)
  }

  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`)
  }
  // let loaded = null;

  useEffect(() => {
    if(!mine) {
      if(loaded) {
        if(saved) {
          if(typeof id === 'number') {
            console.log('slayyyyy')
            createExternalSave(id)
              .then(save => console.log(save))
              .catch(err => console.log(err))
          } else {
            createDbSave(id)
              .then(save => console.log(save))
              .catch(err => console.log(err))
          }
        } else {
          if(typeof id === 'number') {
            console.log('slayyyyy')
            deleteExternalSave(id)
              .then(save => console.log(save))
              .catch(err => console.log(err))
          } else {
            deleteDbSave(id)
              .then(save => console.log(save))
              .catch(err => console.log(err))
          }
        }
      } else {
        setLoaded(true)
      }
    }
  }, [saved])

  return (
    <div>
      <div className="card" style={{width: "18rem"}}>
        {img && <img src={img} className="card-img-top" alt={name} />}
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <Link to={`/recipes/${id}`}>
            <p className='btn btn-success'>See more</p>
          </Link>
          {!mine && <button className={saved ? 'btn btn-info' : 'btn btn-primary'} onClick={handleClick}>Save</button>}
          {mine && <div>
            <button className='btn btn-warning' onClick={handleEdit}>Edit</button>
            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>  
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Recipe;