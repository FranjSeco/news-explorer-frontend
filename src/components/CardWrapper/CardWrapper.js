import './CardWrapper.css';

const CardWrapper = (props) => (
    <section className='card-wrapper'>
        {props.children}
    </section>
);

export default CardWrapper;
