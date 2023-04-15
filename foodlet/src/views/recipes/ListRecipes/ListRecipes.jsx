import React, { useContext } from 'react';
import Recipe from '../../../components/recipes/Recipe/Recipe';
import RecipesContext from '../../../contexts/RecipesContext';

const ListRecipes = () => {
  const { currentRecipes } = useContext(RecipesContext)

  return (
    <div>
      {currentRecipes && 
        currentRecipes.map(recipe => {
          return <div key={recipe.name}>
            <Recipe name={recipe.name} description={recipe.description} ingredients={recipe.sections} time={recipe.cook_time_minutes + recipe.prep_time_minutes} id={recipe.id}/>
          </div>
        })
      }
    </div>
  );
};

export default ListRecipes;