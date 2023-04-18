import React, { useEffect, useState } from 'react';
import { getMyReviews } from '../../services/ReviewService';
import { getExternalRecipesById } from '../../services/RecipeService';

const Review = ({ user='', score, text, image, review='' }) => {
  const [recipe, setRecipe] = useState([])
  const [recipeLoaded, setRecipeLoaded] = useState([])

  useEffect(() => {
    if(review) {
      // reviews.forEach((review) => {
      //   if(review.externalRecipe) {
      //     promiseArr.push(getExternalRecipesById(review.externalRecipe))
      //   } else {
      //     // setMySaves([...mySaves, value[0]])
      //     myPopulatedArr.push(review.dbRecipe)
      //   }
      // })
      // Promise.all(promiseArr)
      //   .then(values => {
      //     values.map((value, i) => {
      //       setRecipes([...recipes, value[0]])
      //       console.log(value[0])
      //       // if(values[i] === values[values.length - 1]){
      //       //   setMySavesLoaded(true)
      //       // }
      //     })
      //     setRecipesLoaded(true)
      // })
      console.log(review.externalRecipe)
      if(review.externalRecipe) {
        getExternalRecipesById(review.externalRecipe)
          .then(recipe => {
            console.log(recipe[0].name)
            setRecipe(recipe[0])
            setRecipeLoaded(true)
          })
      } else if(review.dbRecipe) {
        console.log('slay')
        console.log(review.dbRecipe)
        setRecipe(review.dbRecipe)
        setRecipeLoaded(true)
      }
    }
  }, [])

  return (
    <div>
      {/* for score you can just set a star that .repeat for as much score as you get, and then paint the text and the image as the basic bootstrap card, goodluck :) */}
      <div className="card" style={{width: "18rem"}}>
        {image && <img src={image} className="card-img-top" alt="reiew" />}
        <div className="card-body">
          <p className="card-title"><b>@{user.username}</b></p>
          <p className="card-text">{'⭐'.repeat(score)}</p>
          <p className="card-text">{text}</p>
          {recipeLoaded && <p>{recipe.name}</p>}
        </div>
      </div>
    </div>
  );
};

{/* if you get recipe just paint what you've saved in recipe, good luck, hope u dont get too many errors :) */}

export default Review;