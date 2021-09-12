/* eslint-disable */

import React from 'react';
import { useLocation } from 'react-router-dom';
import NewsCards from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import CardWrapper from '../CardWrapper/CardWrapper';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Savednewsheader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

const SavedNews = (props) => {
  const location = useLocation();
  const userInfo = React.useContext(CurrentUserContext);
  const [indexShow, setIndexShow] = React.useState(3);

  const userSavedArticles = props.savedArticles.data.filter(
    (element, i) => element.owner === userInfo._id,
  );

  // console.log(userSavedArticles);

  const keywords = userSavedArticles.map(element => { return element.keyword });

  const cnts = keywords.reduce(function (obj, val) {
    obj[val] = (obj[val] || 0) + 1;
    return obj;
  }, {});
  const sorted = Object.keys(cnts).sort(function (a, b) {
    return cnts[b] - cnts[a];
  });

  // console.log(keywords, 'key');

  const maxLength = userSavedArticles.length;

  function handleLoadMore() {
    setIndexShow(indexShow + 3);
  }
  return location.pathname === '/saved-news' && (
    <>
      <Savednewsheader
        numberOfArticles={maxLength}
        keywordSorted={sorted}
      />
      <section className='saved-cards'>
        {props.loadingSaved === true
          && <div className='saved-cards__preloader-wrapper'>
            <Preloader />
          </div>
        }
        {props.savedArticles.data
          && <>
            <CardWrapper>
              {userSavedArticles.filter((element, i) => i < indexShow).map((article, index) => (
                <NewsCards
                  key={index}
                  element={article}
                  isLoggedIn={props.isLoggedIn}
                  handleSaveArticle={props.handleSaveArticle}
                  savedArticles={props.savedArticles}
                  handleDeleteArticle={props.handleDeleteArticle}
                />
              ))}
            </CardWrapper>
            <div className='saved-cards__loadmore-wrapper'
              style={{ display: (indexShow >= maxLength) ? 'none' : 'flex' }}
            >
              <button className='saved-cards__loadmore-button' onClick={() => handleLoadMore()}>
                Show more
              </button>
            </div>
          </>
        }
      </section>
    </>
  );
};

export default SavedNews;
