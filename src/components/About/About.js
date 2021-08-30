import './About.css';

import authorPicture from '../../images/photo-1629776477848-d59f78e70835.jpg';

const About = () => (
    <section className='about'>
        <div className='about__wrapper'>
            <div className='about__picture-wrapper'>
                <img className='about__picture' src={authorPicture} alt="Author" />
            </div>

            <div className='about__info-wrapper'>
                <h2 className='about__title'>About the author</h2>
                <p className='about__text'>This block describes the project author. Here you should indicate
                    your name, what you do, and which development technologies you know.
                    <br />
                    <br />
                    You can also talk about your experience with Practicum, what you learned there,
                    and how you can help potential customers.</p>
            </div>
        </div>
    </section>
);

export default About;
