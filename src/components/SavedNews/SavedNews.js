import NewsCards from '../NewsCard/NewsCard';
import './SavedNews.css';

const SavedNews = () => (
    <section className='saved-cards'>
        <div className='saved-cards__wrapper'>
            <NewsCards></NewsCards>
            <NewsCards></NewsCards>
            <NewsCards></NewsCards>
            <NewsCards></NewsCards>
        </div>
    </section>
);

export default SavedNews;
