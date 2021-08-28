import React from 'react';

import './SearchForm.css';

const SearchForm = () => (
        <form>
            <input
                className='search-bar'
                placeholder='Enter topic'
            ></input>
            <button className='search-btn'>Search</button>
        </form>

);

export default SearchForm;
