import React from 'react';

const Review = ({ user, score, text, image }) => {
  return (
    <div>
      {/* for score you can just set a star that .repeat for as much score as you get, and then paint the text and the image as the basic bootstrap card, goodluck :) */}
      <div className="card" style={{width: "18rem"}}>
        <img src={image} className="card-img-top" alt="reiew" />
        <div className="card-body">
          <p className="card-title"><b>@{user.username}</b></p>
          <p className="card-text">{'⭐'.repeat(score)}</p>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;