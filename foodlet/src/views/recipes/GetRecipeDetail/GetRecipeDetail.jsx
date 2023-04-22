import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../../contexts/RecipesContext';
import { useParams } from 'react-router-dom';
import { getMyRecipesById, getExternalRecipesById } from '../../../services/RecipeService';
import { getReviewsByRecipe } from '../../../services/ReviewService';
import Review from '../../../components/Review/Review';
import './GetRecipeDetail.css'

const GetRecipeDetail = () => {
  const { currentRecipes } = useContext(RecipesContext)
  const { id } = useParams()

  const [recipe, setRecipe] = useState(null)
  const [typeOfRecipe, setTypeOfRecipe] = useState(null)

  const [reviews, setReviews] = useState([])
  const [reviewsLoaded, setReviewsLoaded] = useState(false)

  useEffect(() => {
    if(id < 10000) {
      getExternalRecipesById(id)
      .then(response => {
        setRecipe(response[0])
        setTypeOfRecipe('api')
        getReviewsByRecipe(id)
          .then(reviews => setReviews(reviews))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    } else{
      getMyRecipesById(id) 
        .then(response => {
          setRecipe(response)
          setTypeOfRecipe('db')
          getReviewsByRecipe(id)
            .then(reviews => setReviews(reviews))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <div className='app-container'>
      {recipe && 
        <div className='RecipeDetail'>
          <h3>{recipe.name}</h3>
          <h5>{recipe.description}</h5>
          <div className='time-recipe-detail'>
            <i class="fa-solid fa-clock"></i>
            <p>{typeOfRecipe === 'db' ? recipe.time : recipe.total_time_minutes} minutes</p>
          </div>
          <p>{recipe.oven && <p className='recipe-tag'>oven needed</p>}</p>
          <p>{recipe.fridge && <p className='recipe-tag'>oven needed</p>}</p>
          <div className='detail-container'>
            <h5 className='profile-heading'>Ingredients:</h5>
            <ul>
              {typeOfRecipe === 'db' ?
                recipe.ingredients.map(ingredient => {
                  return <div key={ingredient.name} className='ingredient-tag' style={{margin:'0 0 10px 0'}}>
                    <li>{ingredient.amount}g of {ingredient.name}</li>
                  </div>
                })
              :
                recipe.sections[0].components.map(ingredient => {
                  return <li key={ingredient.raw_text}>{ingredient.raw_text}</li>
                })
              }
            </ul>
          </div>
          <div className='detail-container'>
            <h5 className='profile-heading'>Steps:</h5>
            <ol>
              {typeOfRecipe === 'db' ? 
                recipe.steps.map(step => {
                  return <li key={step.heading} className='step-tag' style={{margin:'0 0 10px 0'}}>
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
          {reviews && <div className='detail-container'>
            <h5 className='profile-heading'>Reviews:</h5>
            <div style={{display:'flex', gap:'5px', flexWrap:'wrap'}}>
              {reviews.map(review => {
                return <Review user={review.user} score={review.score} text={review.text} image={review.image} />
              })}
            </div>
          </div>  
          }
        </div>
      }
      {!recipe && <p>Searching for your recipe...</p>}
    </div>
  );
};

export default GetRecipeDetail;