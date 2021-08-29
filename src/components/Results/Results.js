import NewsCards from '../NewsCard/NewsCard';
import CardWrapper from '../CardWrapper/CardWrapper';
import './Results.css';

const Results = () => (
        <section className='results'>
            <h2 className='results_title'>Search Results</h2>

            <CardWrapper>
                <NewsCards></NewsCards>
                <NewsCards></NewsCards>
                <NewsCards></NewsCards>
            </CardWrapper>
        </section>
);

export default Results;
