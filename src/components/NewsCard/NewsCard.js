/* eslint-disable */
import React from 'react';
import { useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './NewsCard.css';

const NewsCards = ({
  element,
  index,
  isLoggedIn,
  handleSaveArticle,
  savedArticles,
  handleDeleteArticle,
  tag,
  openSignUp
}) => {
  const userInfo = React.useContext(CurrentUserContext);
  const location = useLocation();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const { publishedAt } = element;
  const date = new Date(publishedAt);
  const formatedDate = date.toLocaleDateString('en-US', options);
  const [signTag, setSignTag] = React.useState('none');
  const [isSaved, setIsSaved] = React.useState(false);

  function handleSignInTag() {
    setSignTag(signTag === 'flex' ? 'none' : 'flex');
  }

  // console.log(element);

  React.useEffect(() => {
    if (savedArticles.data !== undefined) {
      // console.log(userInfo, 'user');
      // console.log(savedArticles.data, 'saved article');
      setIsSaved(!!savedArticles.data.some((el) => el.title === element.title && el.owner === userInfo._id));
      // console.log(isSaved);
    }
  }, [isSaved, setIsSaved, savedArticles]);

  return (
    <div className='card' key={index}>
      <div className='card__cover-wrapper' >
        <img className='card__image' src={element.urlToImage || element.image} alt='news cover image' />

        {isLoggedIn && location.pathname === '/saved-news'
          && <button className='card__button card__button-tag'>{element.keyword}</button>
        }

        {!isLoggedIn
          && <>
            <button className='card__button card__login-warn' style={{ display: `${signTag}` }}>Sign in to save articles</button>
            <button
              className='card__button card__button-mark_not-loggedin'
              type='button'
              onMouseEnter={() => handleSignInTag()}
              onMouseLeave={() => handleSignInTag()}
              onClick={() => openSignUp()}
            ></button>
          </>
        }
        {isLoggedIn
          && <>
            <button
              className={`card__button card__button-mark ${(isSaved) ? 'card__button-mark_active' : ''}`}
              type='button'
              onClick={() => {
                (!isSaved) ? handleSaveArticle({
                  keyword: tag,
                  title: element.title,
                  text: element.description,
                  date: date.toLocaleDateString('en-US', options),
                  source: element.source.name,
                  link: element.url,
                  image: element.urlToImage,
                })
                  : handleDeleteArticle(element);
              }
              }
            ></button>
          </>
        }

        {isLoggedIn && location.pathname === '/saved-news'
          && <button className='card__button card__button-delete' onClick={() => handleDeleteArticle(element)}></button>
        }
      </div>

      <div className='card__info-wrapper'>
        <p className='card__date'>{ formatedDate || date}</p>
        <h2 className='card__title'>{element.title}</h2>
        <p className='card__text'>{element.description || element.text}</p>
        <p className='card__source'>{element.source.name || element.source}</p>
      </div>

    </div>
  );
};

export default NewsCards;
