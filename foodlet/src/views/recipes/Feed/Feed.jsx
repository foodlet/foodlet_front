import React, { useContext, useEffect, useState } from 'react';
import { getFeedRecipes, getUnauthenticatedFeedRecipes } from '../../../services/RecipeService';
import Recipe from '../../../components/recipes/Recipe/Recipe';
import AuthContext from '../../../contexts/AuthContext';

const Feed = () => {
  const [recipes, setRecipes] = useState([])
  const [recipesLoaded, setRecipesLoaded] = useState(false)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    // getFeedRecipes()
    //   .then(recipes => {
    //     setRecipes(recipes)
    //     setRecipesLoaded(true)
    //   })
    //   .catch(err => console.log(err))
    if(currentUser) {
      getFeedRecipes()
        .then(recipes => {
          setRecipes(recipes)
          setRecipesLoaded(true)
        })
        .catch(err => console.log(err))
    } else {
      getUnauthenticatedFeedRecipes()
        .then(recipes => {
          setRecipes(recipes)
          setRecipesLoaded(true)
        })
    }
  }, [])

  return (
    <div>
      {recipesLoaded && <div>
        {recipes.map(recipe => {
          return <Recipe name={recipe.name} description={recipe.description} img={recipe.image} id={recipe._id}/> 
        })} 
      </div>}
    </div>
  );
};

export default Feed;