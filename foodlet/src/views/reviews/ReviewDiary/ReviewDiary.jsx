import React, { useEffect, useState } from 'react';
import { getMyReviews } from '../../../services/ReviewService';
import Review from '../../../components/Review/Review';

const ReviewDiary = () => {
  const [reviews, setReviews] = useState([])
  const [reviewsLoaded, setReviewsLoaded] = useState(false)

  useEffect(() => {
    getMyReviews()
      .then(reviews => {
        console.log(reviews)
        setReviews(reviews)
        setReviewsLoaded(true)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='app-container'>
      <h3>Your review diary</h3>
      {reviewsLoaded && <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
        {reviews.map(review => {
          // {review.dbRecipe ? recipe = review.dbRecipe : recipe = review.externalRecipe}
          return <div key={review._id}>
            <Review score={review.score} text={review.text} image={review.image} review={review}/>
          </div>
        })}
      </div>}
    </div>
  );
};

export default ReviewDiary;