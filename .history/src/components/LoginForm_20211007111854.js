import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { LOGIN } from '../queries';

const LoginForm = ({ setError, setToken }) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {},
  });

  return <div></div>;
};

export default LoginForm;
