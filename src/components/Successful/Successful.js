import React from 'react';

import './Successful.css';

import PopupWithForm from '../PopupWithForm/PopupWithForm';

const Successful = (props) => (
        <PopupWithForm
            // onSubmit={handleSubmit}
            name={'successful'}
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <h2 className='successful__title'>Registration successfully completed!</h2>
            <p className='successful__link' onClick={props.openSignIn}>Sign in</p>
        </PopupWithForm>
);

export default Successful;
