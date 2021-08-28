import NewsCards from '../NewsCard/NewsCard';
import './Results.css';

const Results = () => (
        <section className='results'>
            <h2 className='results_title'>Search Results</h2>

            <div className='results__wrapper'>
                <NewsCards></NewsCards>
                <NewsCards></NewsCards>
                <NewsCards></NewsCards>
            </div>
        </section>
);

export default Results;
