import React from 'react';
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai';
import './Footer.css';

const Footer = () => (
        <footer className='footer'>
            <div className='footer__wrapper'>
                <div className='footer__copyright-wrapper'>
                    <p className='footer__copyright'>© 2021 Supersite, Powered by News API</p>
                </div>

                <div className='footer__navigation-wrapper'>
                    <div className='footer__nav-home'>
                        <a className='footer__home' href='/'>Home</a>
                        <a className='footer__practicum' href='/'>Practicum by Yandex</a>
                    </div>
                    <div className='footer__social-wrapper'>
                        <a className='footer__social-link' href='https://github.com/FranjSeco' target="_blank" rel="noreferrer">
                            <AiFillGithub size='20px' />
                        </a>
                        <a className='footer__social-link' href='/' target="_blank" rel="noreferrer">
                            <AiFillFacebook size='20px' />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
);

export default Footer;
