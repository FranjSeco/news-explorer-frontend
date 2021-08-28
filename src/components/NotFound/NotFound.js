import React from 'react';
import notFoundImg from '../../images/not-found_v1.svg';
import './NotFound.css';

const NotFound = () => (
                <div className='notfound'>
                        <img src={notFoundImg} alt='' className='notfound__image' />
                        <h2 className='notfound__title'>Nothing found</h2>
                        <p className='notfound__text'>Sorry, but nothing matched
                                your search terms.</p>
                </div>
);

export default NotFound;
