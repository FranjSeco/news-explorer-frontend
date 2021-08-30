import React from 'react';
import './SavedNewsHeader.css';

const Savednewsheader = () => (
        <main className="savednewsheader">
            <div className='savednewsheader__wrapper'>
                <h2 className='savednewsheader__title'>Saved articles</h2>
                <p className='savednewsheader__text'>Elise, you have 5 saved articles</p>
                <p className='savednewsheader__keyword'>By keywords: <span>Nature, Yellowstone, and 2 other</span></p>
            </div>
        </main>
);

export default Savednewsheader;
