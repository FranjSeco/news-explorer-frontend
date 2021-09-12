import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback(false);
      } else {
        callback(true);
      }
    },
    [errors],
  );

  // console.log(errors, 'useform');
  // console.log(values, 'values');

  return {
    handleChange, handleSubmit, values, errors,
  };
};

export default useForm;
