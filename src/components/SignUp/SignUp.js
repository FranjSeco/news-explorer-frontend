/* eslint-disable */

import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useForm from '../../utils/useForm';
import validate from './ValidateSignUp';

import './SignUp.css';

const SignUp = (props) => {
  const [userPassword, setUserPassword] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  function handleDisabled(set) {
    setButtonDisabled(set);
  }

  const {
    handleChange, handleSubmit, values, errors,
  } = useForm(handleDisabled, validate);

  // console.log(errors, 'errors');

  const resetForm = () => {
    setUserPassword('');
    setUserEmail('');
    setUserName('');
    values.password = '';
    values.email = '';
    values.username = '';
    errors.email = '';
    errors.userName = '';
    errors.password = '';
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
    props.handleSignUp(userName, userEmail, userPassword);
    resetForm();
  };

  function OnEmailChange(e) {
    handleChange(e);
    setUserEmail(e.target.value);
    console.log(userEmail, 'onchange email');
  }
  function OnPasswordChange(e) {
    handleChange(e);
    setUserPassword(e.target.value);
    console.log(userPassword, 'onchange pw');
  }

  function OnNameChange(e) {
    handleChange(e);
    setUserName(e.target.value);
    console.log(userName, 'onchange name');
  }

  function onClosing() {
    props.onClose();
    resetForm();
  }

  return (
    <PopupWithForm
      onSubmit={onSubmit}
      name={'signup'}
      title={'Sign Up'}
      // btn={'Sign in'}
      isOpen={props.isOpen}
      onClose={onClosing}
    >
      <h2 className='signup__title'>Sign up</h2>
      <label className='signup__email-label' htmlFor="email">Email </label>
      <input
        className='signup__form-email'
        placeholder='Enter email'
        type='email'
        name='email'
        minLength={2}
        maxLength={200}
        required
        // value={userEmail}
        // onChange={(e) => setUserEmail(e.target.value)}
        value={values.email}
        onChange={(e) => OnEmailChange(e)}

      ></input>

      {errors.email && <p className={'signup__form_error'}>{errors.email}</p>}

      <label className='signup__password-label' htmlFor="password">Password</label>
      <input
        className='signup__form-password'
        placeholder='Enter password'
        type='password'
        name='password'
        minLength={2}
        maxLength={200}
        required
        // value={userPassword}
        // onChange={(e) => setUserPassword(e.target.value)}
        value={values.password}
        onChange={(e) => OnPasswordChange(e)}
      >
      </input>

      {errors.password && <p className={'signup__form_error'}>{errors.password}</p>}

      <label className='signup__username-label' htmlFor="username">Username</label>
      <input
        className='signup__form-username'
        placeholder='Enter username'
        type='text'
        name='username'
        minLength={2}
        maxLength={200}
        required
        // value={userName}
        // onChange={(e) => setUserName(e.target.value)}
        value={values.username}
        onChange={(e) => OnNameChange(e)}
      >
      </input>

      {errors.username && <p className={'signup__form_error'}>{errors.username}</p>}

      {props.signUpResponse && <p className={'signup__submit_error'}>This email is not available</p>}
      <button className={`signup__submit ${buttonDisabled && 'signup__submit_disabled'}`} type='submit' disabled={buttonDisabled}>Sign up</button>

      <p className='signup__text'>or <span href='/' onClick={props.openSignIn} className='signup__text_link'>Sign in</span></p>

    </PopupWithForm>
  );
};

export default SignUp;
