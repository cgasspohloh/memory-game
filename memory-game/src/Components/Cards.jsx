import React from 'react';

function Card({ image, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img className='card-image' alt="card image" src={image} />
    </div>
  );
}

export default Card;
