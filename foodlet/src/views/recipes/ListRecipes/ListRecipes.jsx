import React, { useContext } from 'react';
import Recipe from '../../../components/recipes/Recipe/Recipe';
import RecipesContext from '../../../contexts/RecipesContext';
import { PuffLoader } from 'react-spinners';

const ListRecipes = () => {
  const { currentRecipes } = useContext(RecipesContext)

  return (
    <div className='app-container' style={{display:'flex', gap:'9px', flexWrap:'wrap'}}>
      {currentRecipes && 
        currentRecipes.map(recipe => {
          return <div key={recipe.name}>
            <Recipe name={recipe.name} description={recipe.description} ingredients={recipe.sections} time={recipe.cook_time_minutes + recipe.prep_time_minutes} id={recipe.id}/>
          </div>
        })
      }
      {!currentRecipes &&
        <div className='loader-div'>
          <PuffLoader
            color='#006A4C'
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      }
    </div>
  );
};

export default ListRecipes;