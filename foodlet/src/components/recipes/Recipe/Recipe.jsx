import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createDbSave, createExternalSave, deleteDbSave, deleteExternalSave } from '../../../services/SaveService';
import { deleteRecipe } from '../../../services/RecipeService';
import './Recipe.css';

const Recipe = ({ name, description, ingredients, time, img='', id, mine=false }) => {
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(null)
 
  const handleClick = useCallback(() => {
    setSaved(prevState => !prevState)
  }, [])

  const handleDelete = id => {
    console.log(id)
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
    <div className='Recipe'>
      <div className="card" style={{backgroundColor: 'rgb(246, 245, 245)', border: 'none'}}>
        {img && <img src={img} className="card-img-top" alt={name} />}
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <div>
            <Link to={`/recipes/${id}`}>
              <p className='btn' style={{backgroundColor: '#25A244', color: 'white', padding: '8px 20px'}}>See more</p>
            </Link>
            {!mine && <div>
              <button className={saved ? 'btn btn-info' : 'btn btn-primary'} onClick={handleClick}>Save</button>
              <Link className='btn btn-warning' to={`/create-review/${id}`}>Review</Link>
            </div>
            }
            {mine && <div>
              <button className='btn' onClick={() => handleEdit()} style={{backgroundColor: 'rgb(154, 154, 154)'}}><i className="fa-solid fa-pen-to-square"></i></button>
              <button className='btn' onClick={() => handleDelete(id)} style={{backgroundColor: 'rgb(154, 154, 154)'}}><i className="fa-solid fa-trash"></i></button>  
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;