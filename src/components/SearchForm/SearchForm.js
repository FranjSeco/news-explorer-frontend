import React from 'react';

import './SearchForm.css';

const SearchForm = (props) => {
  const requestRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onSearchMain({
      request: requestRef.current.value,
    });
    requestRef.current.value = '';
  }
  return (
        <form onSubmit={handleSubmit}>
            <input
                ref={requestRef}
                className='search-bar'
                placeholder='Enter topic'
                required
            ></input>
            <button className='search-btn' type="submit">Search</button>
        </form>
  );
};

export default SearchForm;
