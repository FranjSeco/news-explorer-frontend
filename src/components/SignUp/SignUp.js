import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './SignUp.css';

const SignUp = (props) => {
  const [userPassword, setUserPassword] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');

  const resetForm = () => {
    setUserPassword('');
    setUserEmail('');
    setUserName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSignUp(userName, userEmail, userPassword);

    resetForm();
  };
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={'signup'}
      title={'Sign Up'}
      // btn={'Sign in'}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <h2 className='signup__title'>Sign up</h2>
      <label className='signup__email-label' htmlFor="email">Email </label>
      <input
        className='signup__form-email'
        placeholder='Enter email'
        type='text'
        name='email'
        minLength={2}
        maxLength={200}
        required
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      ></input>

      <span
        id="name-input-error"
        className="form-input-error" />

      <label className='signup__password-label' htmlFor="password">Password</label>
      <input
        className='signup__form-password'
        placeholder='Enter password'
        type='password'
        name='password'
        minLength={2}
        maxLength={200}
        required
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      >
      </input>

      <label className='signup__username-label' htmlFor="username">Username</label>
      <input
        className='signup__form-username'
        placeholder='Enter username'
        type='text'
        name='username'
        minLength={2}
        maxLength={200}
        required
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      >
      </input>

      <span
        id="about-input-error"
        className="form-input-error"
      />

      <button className='signup__submit' type='submit'>Sign up</button>

      <p className='signup__text'>or <span href='/' onClick={props.openSignIn} className='signup__text_link'>Sign in</span></p>

    </PopupWithForm>
  );
};

export default SignUp;
