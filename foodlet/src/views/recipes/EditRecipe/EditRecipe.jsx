import React, { useEffect, useState } from 'react';
import { getRecipesById } from '../../../services/RecipeService';
import CreateRecipe from '../CreateRecipe/CreateRecipe';
import { useParams } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams()

  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    getRecipesById(id)
      .then(recipe => setRecipe(recipe))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      {recipe &&
        <CreateRecipe edit={true} editValues={recipe}/>
      }
    </div>
  );
};

export default EditRecipe;