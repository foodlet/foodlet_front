import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../../contexts/RecipesContext';
import { useParams } from 'react-router-dom';
import { getMyRecipesById, getRecipesById } from '../../../services/RecipeService';

const GetRecipeDetail = () => {
  const { currentRecipes } = useContext(RecipesContext)
  const { id } = useParams()

  const [recipe, setRecipe] = useState(null)
  const [typeOfRecipe, setTypeOfRecipe] = useState(null)

  useEffect(() => {
    if(currentRecipes) {
      getRecipesById(id)
      .then(response => {
        setRecipe(response[0])
        setTypeOfRecipe('api')
        console.log(response)
      })
      .catch(err => console.log(err))
    } else{
      getMyRecipesById(id) 
        .then(response => {
          setRecipe(response)
          setTypeOfRecipe('db')
          console.log(response.ingredients)
        })
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <div>
      {recipe && 
        <div>
          <h3>{recipe.name}</h3>
          <h5>{recipe.description}</h5>
          <p>Time: {typeOfRecipe === 'db' ? recipe.time : recipe.total_time_minutes} minutes</p>
          <p>{recipe.oven && 'oven needed'}</p>
          <p>{recipe.fridge && 'fridge needed'}</p>
          <h5>Ingredients:</h5>
          <ul>
            {typeOfRecipe === 'db' ?
              recipe.ingredients.map(ingredient => {
                return <div key={ingredient.name}>
                  <li>{ingredient.amount}g of {ingredient.name}</li>
                </div>
              })
            :
              recipe.sections[0].components.map(ingredient => {
                return <li key={ingredient.raw_text}>{ingredient.raw_text}</li>
              })
            }
          </ul>
          <h5>Steps:</h5>
          <ol>
            {typeOfRecipe === 'db' ? 
              recipe.steps.map(step => {
                return <li key={step.heading}>
                  <p><b>{step.heading}</b></p>
                  <p>{step.text}</p>
                </li>
              })
            :
              recipe.instructions.map(step => {
                return <li key={step.display_text}>{step.display_text}</li>
              })
            }
          </ol>
        </div>
      }
    </div>
  );
};

export default GetRecipeDetail;