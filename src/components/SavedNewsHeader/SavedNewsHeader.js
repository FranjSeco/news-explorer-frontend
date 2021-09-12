/* eslint-disable */
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

const Savednewsheader = ({ numberOfArticles, keywordSorted }) => {
  const userInfo = React.useContext(CurrentUserContext);

  // calculate keywords left
  const leftOver = keywordSorted.length - 2;

  return (
    <main className="savednewsheader">
      <div className='savednewsheader__wrapper'>
        <h2 className='savednewsheader__title'>Saved articles</h2>
        <p className='savednewsheader__text'>{`${userInfo.name}`}, you have {`${numberOfArticles}`} saved articles</p>
        {keywordSorted.length === 0
          && <p className='savednewsheader__keyword'>There are no keywords</p>
        }

        {keywordSorted.length === 1
          && <p className='savednewsheader__keyword'>By keywords: <span>{`${keywordSorted[0]}`}</span></p>
        }

        {keywordSorted.length === 2
          && <p className='savednewsheader__keyword'>By keywords: <span>{`${keywordSorted[0]}`} and {`${keywordSorted[1]}`}</span></p>
        }

        {keywordSorted.length >= 3
          && <p className='savednewsheader__keyword'>By keywords: <span>{`${keywordSorted[0]}`}, {`${keywordSorted[1]}`} and {`${leftOver}`} more</span></p>
        }

      </div>
    </main >
  );
};

export default Savednewsheader;
