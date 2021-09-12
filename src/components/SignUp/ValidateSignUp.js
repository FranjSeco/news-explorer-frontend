/* eslint-disable */
export default function validateInfo(values) {
  let errors = {};

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 4) {
    errors.password = 'Password needs to be 5 characters or more';
  }

  if (!values.username) {
    errors.username = 'Username required';
  }
  return errors;
}
