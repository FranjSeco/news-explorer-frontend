import NewsCards from '../NewsCard/NewsCard';
import CardWrapper from '../CardWrapper/CardWrapper';
import './SavedNews.css';

const SavedNews = () => (
    <section className='saved-cards'>
        <CardWrapper>
            <NewsCards></NewsCards>
            <NewsCards></NewsCards>
            <NewsCards></NewsCards>
            <NewsCards></NewsCards>
        </CardWrapper>
    </section>
);

export default SavedNews;
