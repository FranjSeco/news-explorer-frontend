import React from 'react';
import './NewsCard.css';

// import trash from '../..images/trash.svg';

const NewsCards = () => {
  const [isLoggedIn] = React.useState(true);

  return (
        <div className='card'>
            <div className='card__cover-wrapper' >
                <img className='card__image' src={'https://images.unsplash.com/photo-1629831676333-8e33b2d7cdd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'} alt='cover' />

                {isLoggedIn
                && <button className='card__button card__button-tag'>Nature</button>
                }

                {isLoggedIn
                  ? <button className='card__button card__button-delete'></button>
                  : <button className='card__button  card__button-mark'></button>}
            </div>

            <div className='card__info-wrapper'>
                <p className='card__date'>November 4, 2020</p>
                <h2 className='card__title'>Everyone Needs a Special 'Sit Spot' in Nature</h2>
                <p className='card__text'>Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...</p>
                <p className='card__source'>treehugger</p>
            </div>

        </div>
  );
};

export default NewsCards;
