import React from 'react';
import './NewsCard.css';

import { useLocation } from 'react-router-dom';

const NewsCards = ({
  element,
  index,
  isLoggedIn,
  handleSaveArticle,
}) => {
  const location = useLocation();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const { publishedAt } = element;
  const date = new Date(publishedAt);
  console.log(element, 'article');
  const [signTag, setSignTag] = React.useState('none');
  function handleSignInTag() {
    setSignTag(signTag === 'flex' ? 'none' : 'flex');
    console.log('holi');
  }

  return (
    <div className='card' key={index}>
      <div className='card__cover-wrapper' >
        <img className='card__image' src={element.urlToImage} alt='news cover image' />

        {isLoggedIn
          && <button className='card__button card__button-tag'>Nature</button>
        }

        {isLoggedIn && location.pathname === '/saved-news'
          && <button className='card__button card__button-delete'></button>

        }
        {!isLoggedIn
          && <>
            <button className='card__button card__login-warn' style={{ display: `${signTag}` }}>Sign in to save articles</button>
            <button
              className='card__button card__button-mark_not-loggedin'
              type='button'
              onMouseEnter={() => handleSignInTag()}
              onMouseLeave={() => handleSignInTag()}
            ></button>
          </>
        }
        {isLoggedIn
          && <>
            <button
              className='card__button card__button-mark'
              type='button'
              // onClick={() => handleSaveArticle({
              //   keyword: 'NoK',
              //   title: element.title,
              //   text: element.description,
              //   date: date.toLocaleDateString('en-US', options),
              //   source: element.source.name,
              //   link: element.url,
              //   image: element.urlToImage,
              // })}
            ></button>
          </>
        }
      </div>

      <div className='card__info-wrapper'>
        <p className='card__date'>{date.toLocaleDateString('en-US', options)}</p>
        <h2 className='card__title'>{element.title}</h2>
        <p className='card__text'>{element.description}</p>
        <p className='card__source'>{element.source.name}</p>
      </div>

    </div>
  );
};

export default NewsCards;
