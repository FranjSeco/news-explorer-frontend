/* eslint-disable */
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Main.css';

const Main = (props) => {
    function onSearch({request}) {
        props.onSearch(request);
    }
    return (
        <main className="main">
            <div className='main__background'>
                <div className='main__wrapper'>
                    <h2 className='main__title'>What's going on in the world?</h2>

                    <p className='main__subtitle'>Find the latest news on any topic and save them in your personal account.</p>

                    <div className='main__input-wrapper'>
                        <SearchForm onSearchMain={onSearch}></SearchForm>
                    </div>



                </div>
            </div>
        </main>
    );
};

export default Main;
