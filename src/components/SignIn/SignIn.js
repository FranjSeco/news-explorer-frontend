import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

import './SignIn.css';

const SignIn = (props) => (
    <PopupWithForm
        // onSubmit={handleSubmit}
        name={'signin'}
        title={'Sign in'}
        // btn={'Sign in'}
        isOpen={props.isOpen}
        onClose={props.onClose}
    >
        <h2 className='signin__title'>Sign in</h2>
        <label className='signin__email-label' htmlFor="email">Email </label>
        <input
            className='signin__form-email'
            placeholder='Enter email'
            type='text'
            name='email'
            minLength={2}
            maxLength={200}
            required
        // value={userEmail}
        // onChange={e => setUserEmail(e.target.value)}
        ></input>

        <span
            id="name-input-error"
            className="form-input-error" />

        <label className='signin__password-label' htmlFor="password">Password</label>
        <input
            className='signin__form-password'
            placeholder='Enter password'
            type='password'
            name='password'
            minLength={2}
            maxLength={200}
            required
        // value={userPassword}
        // onChange={e => setUserPassword(e.target.value)}
        >

        </input>

        <span
            id="about-input-error"
            className="form-input-error"
        />

        <button className='signin__submit' type='submit'>Sign in</button>

        <p className='signin__text'>or <span onClick={props.openSignUp} className='signin__text_link'>Sign up</span></p>

    </PopupWithForm>
);

export default SignIn;
