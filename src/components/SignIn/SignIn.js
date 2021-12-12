import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useForm from '../../utils/useForm';
import validate from './ValidateSignIn';
import './SignIn.css';

const SignIn = (props) => {
  const [userPassword, setUserPassword] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  function handleDisabled(set) {
    setButtonDisabled(set);
  }

  const {
    handleChange, handleSubmit, values, errors,
  } = useForm(handleDisabled, validate);

  const resetForm = () => {
    setUserPassword('');
    setUserEmail('');
    values.password = '';
    values.email = '';
    errors.email = '';
    errors.password = '';
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
    props.handleSignIn(userEmail, userPassword);
    resetForm();
  };

  function OnEmailChange(e) {
    handleChange(e);
    setUserEmail(e.target.value);
  }
  function OnPasswordChange(e) {
    handleChange(e);
    setUserPassword(e.target.value);
  }

  function onClosing() {
    props.onClose();
    resetForm();
  }

  return (
    <PopupWithForm
      onSubmit={onSubmit}
      name={'signin'}
      title={'Sign in'}
      // btn={'Sign in'}
      isOpen={props.isOpen}
      onClose={onClosing}
    >
      <h2 className='signin__title'>Sign in</h2>
      <label className='signin__email-label' htmlFor="email">Email </label>
      <input
        className='signin__form-email'
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

      {errors.email && <p className={'signin__form_error'}>{errors.email}</p>}

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
        // onChange={(e) => setUserPassword(e.target.value)}
        value={values.password}
        onChange={(e) => OnPasswordChange(e)}
      >

      </input>

      {errors.password && <p className={'signin__form_error'}>{errors.password}</p>}

      {props.signInResponse && <p className={'signup__submit_error'}>Ups! Check your email or password</p>}

      <button className={`signin__submit ${buttonDisabled && 'signin__submit_disabled'}`} type='submit' disabled={buttonDisabled}>Sign in</button>

      <p className='signin__text'>or <span onClick={props.openSignUp} className='signin__text_link'>Sign up</span></p>

    </PopupWithForm>
  );
};

export default SignIn;
