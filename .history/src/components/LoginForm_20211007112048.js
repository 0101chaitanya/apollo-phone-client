import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { LOGIN } from '../queries';

const LoginForm = ({ handleError, setToken }) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      handleError(error.graphQLErrors[0].message);
    },
  });

  return <div></div>;
};

export default LoginForm;
