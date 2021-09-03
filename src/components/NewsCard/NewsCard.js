import React from 'react';
import './NewsCard.css';

// import trash from '../..images/trash.svg';

const NewsCards = ({ element, index }) => {
  console.log({ element });
  const [isLoggedIn] = React.useState(false);

  return (
        <div className='card' key={index}>
            <div className='card__cover-wrapper' >
                <img className='card__image' src={element.urlToImage} alt='news cover image' />

                {isLoggedIn
                && <button className='card__button card__button-tag'>Nature</button>
                }

                {isLoggedIn
                  ? <button className='card__button card__button-delete'></button>
                  : <button className='card__button  card__button-mark'></button>}
            </div>

            <div className='card__info-wrapper'>
                <p className='card__date'>{element.publishedAt}</p>
                <h2 className='card__title'>{element.title}</h2>
                <p className='card__text'>{element.description}</p>
                <p className='card__source'>{element.source.name}</p>
            </div>

        </div>
  );
};

export default NewsCards;
