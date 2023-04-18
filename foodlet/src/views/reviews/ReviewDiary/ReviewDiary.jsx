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
    <div>
      {reviewsLoaded && <div>
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