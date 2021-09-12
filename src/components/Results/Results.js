/* eslint-disable */
import React from 'react';
import NewsCards from '../NewsCard/NewsCard';
import CardWrapper from '../CardWrapper/CardWrapper';

import './Results.css';
import Preloader from '../Preloader/Preloader';

const Results = (props) => {
    // const [isSaved, setIsSaved] = React.useState('');
    const [indexShow, setIndexShow] = React.useState(3);
    const maxLength = props.articles.length;

    function handleLoadMore() {
        setIndexShow(indexShow + 3);
    }

    return (
        <div className='results'>
            <h2 className='results_title'>Search results</h2 >

            {props.isLoading === true &&
                <div className='results__preloader-wrapper'>
                    <Preloader />
                </div>
            }

            {props.articles &&
                <>
                    <CardWrapper>
                        {props.articles.filter((element, i) => i < indexShow).map((article, index) => (
                            <NewsCards
                                key={index}
                                element={article}
                                isLoggedIn={props.isLoggedIn}
                                handleSaveArticle={props.handleSaveArticle}
                                savedArticles={props.savedArticles}
                                handleDeleteArticle={props.handleDeleteArticle}
                                tag={props.tag}
                            />
                        ))}
                    </CardWrapper>
                    <div className='results__loadmore-wrapper'
                        style={{ display: indexShow >= maxLength ? 'none' : 'flex' }}
                    >
                        <button className='results__loadmore-button' onClick={() => handleLoadMore()}>
                            Show more
                        </button>
                    </div>
                </>
            }

        </div >

    );
};

export default Results;
