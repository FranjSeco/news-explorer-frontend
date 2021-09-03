/* eslint-disable */
import React from 'react';
import NewsCards from '../NewsCard/NewsCard';
import CardWrapper from '../CardWrapper/CardWrapper';
import './Results.css';

const Results = (props) => {
    console.log(props.articlesData);
    const [indexShow, setIndexShow] = React.useState(3);

    function handleLoadMore() {
        setIndexShow(indexShow + 3);
    }
    return (
        <section className='results'>
            <h2 className='results_title'>Search Results</h2>

            <CardWrapper>
                {props.articlesData.articles
                    &&
                    props.articlesData.articles.filter((element, i) => i < indexShow).map((article, index) => (
                        <NewsCards
                            key={index}
                            element={article}
                        />
                    ))}
            </CardWrapper>

            <div className='results__loadmore-wrapper'>
                <button className='results__loadmore-button' onClick={() => handleLoadMore()}>Show more</button>
            </div>

        </section>
    );
};

export default Results;
